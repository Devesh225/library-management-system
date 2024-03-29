import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { userModel } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import getDataURI from "../utils/dataURI.js";
import { organisationModel } from "../models/organisationModel.js";

export const memberLogin = catchAsyncError(async (req, res, next) => {
    const { orgId, id, password } = req.body;

    if (!orgId || !id || !password) {
        return next(new ErrorHandler("PLEASE ENTER ALL FIELDS.", 400));
    }

    const organisation = await organisationModel.find({
        organisation_id: orgId,
    });

    if (!organisation) {
        return next(new ErrorHandler("ENTER THE CORRECT ORGANISATION ID", 400));
    }

    const member = await userModel
        .findOne({ user_id: id })
        .select("+user_password");

    if (!member) {
        return next(new ErrorHandler("MEMBER DOES NOT EXIST", 401));
    }

    if (Number(member.organisation_id) !== Number(orgId)) {
        return next(
            new ErrorHandler("MEMBER DOES NOT BELONG TO THIS ORGANISATION", 401)
        );
    }

    const isPasswordMatch = await member.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("INCORRECT ID OR PASSWORD", 401));
    }

    sendToken(res, null, member, "MEMBER LOGGED IN SUCCESSFULLY", 200);
});

export const memberLogout = catchAsyncError(async (req, res, next) => {
    return res
        .status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            // secure: true,
            // sameSite: "none",
        })
        .json({
            success: true,
            message: "Logged Out Successfully.",
        });
});

export const getMemberProfile = catchAsyncError(async (req, res, next) => {
    let member = null;
    if (!req.member) {
        return res.status(200).json({
            success: false,
        });
    } else {
        member = await userModel.findById(req.member._id);
    }

    return res.status(200).json({
        success: true,
        member,
    });
});

export const updateMemberPassword = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("PLEASE ENTER ALL FIELDS.", 400));
    }

    if (newPassword !== confirmPassword) {
        return next(
            new ErrorHandler(
                "NEW PASSWORD AND CONFIRM PASSWORD ARE NOT EQUAL.",
                400
            )
        );
    }

    const member = await userModel
        .findById(req.member._id)
        .select("+user_password");

    const isPasswordMatch = await member.comparePassword(oldPassword);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("INCORRECT PASSWORD", 401));
    }

    member.user_password = newPassword;

    await member.save();

    return res.status(200).json({
        success: true,
        message: "PASSWORD UPDATED SUCCESSFULLY.",
    });
});

export const updateMemberProfile = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, dob } = req.body;
    const file = req.file;

    let member = await userModel.findById(req.member._id);

    let updatedData = {};

    if (name) {
        updatedData.user_name = name;
    }

    if (dob) {
        updatedData.user_dob = dob;
    }

    if (email) {
        updatedData.user_email = email;
    }

    if (phone) {
        updatedData.user_phone = phone;
    }

    if (file) {
        const fileURI = getDataURI(file);
        const mycloud = await cloudinary.v2.uploader.upload(fileURI.content);
        await cloudinary.v2.uploader.destroy(member.user_avatar.public_id);
        updatedData.user_avatar = {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        };
    }

    member = await userModel.findByIdAndUpdate(member._id, updatedData, {
        new: true,
        runValidators: true,
    });

    await member.save();

    return res.status(200).json({
        success: true,
        message: "PROFILE UPDATED SUCCESSFULLY.",
        member,
    });
});

export const memberForgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new ErrorHandler("PLEASE ENTER ALL FIELDS.", 400));
    }

    const user = await userModel.findOne({ user_email: email });

    if (!user) {
        return next(new ErrorHandler("NO USER WITH THIS EMAIL EXISTS", 400));
    }

    const resetToken = await user.getResetToken();

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/member/resetpassword/${resetToken}`;

    // SEND THIS RESET TOKEN VIA EMAIL

    const subject = "Libraly Reset Password";

    const message = `Click On The Link To Reset Your Password: ${resetUrl}`;

    await sendEmail(email, subject, message);

    return res.status(200).json({
        success: true,
        message: `RESET TOKEN HAS BEEN SENT TO ${email}`,
    });
});

export const memberResetPassword = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
    const user = await userModel.findOne({
        user_resetPasswordToken: resetPasswordToken,
        user_resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler(
                "RESET PASSWORD TOKEN IS INVALID OR IS EXPIRED",
                400
            )
        );
    }

    user.user_password = req.body.password;

    user.user_resetPasswordToken = null;
    user.user_resetPasswordExpire = null;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "PASSWORD CHANGED SUCCESSFULLY.",
    });
});
