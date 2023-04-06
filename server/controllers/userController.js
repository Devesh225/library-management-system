import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { userModel } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import getDataURI from "../utils/dataURI.js";


export const getAllMembersAdmin = catchAsyncError(async (req, res, next) => {
    const members = await userModel.find();
    res.status(200).json({
        success: true,
        members
    });
});

export const memberLogin = catchAsyncError(async (req, res, next) => {
    const {id, password} = req.body;
    
    if(!id || !password) {
        return next(new ErrorHandler("PLEASE ENTER ALL FIELDS.", 400));
    }

    const member = await userModel.findOne({ user_id: id }).select("+user_password");

    if(!member) {
        return next(new ErrorHandler("MEMBER DOES NOT EXIST", 401));
    }

    const isPasswordMatch = await member.comparePassword(password);

    if(!isPasswordMatch) {
        return next(new ErrorHandler("INCORRECT ID OR PASSWORD", 401));
    }

    sendToken(res, member, "MEMBER LOGGED IN SUCCESSFULLY", 200);
});

export const memberLogout = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        // secure: true, 
        sameSite: "none"
    }).json({
        success: true,
        message: "Logged Out Successfully."
    });
});

export const getMemberProfile = catchAsyncError(async (req, res, next) => {

    const user = await userModel.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    }); 
});

export const updateMemberPassword = catchAsyncError(async (req, res, next) => {

    const { oldPassword, newPassword } = req.body;

    if(!oldPassword || !newPassword) {
        return next(new ErrorHandler("PLEASE ENTER ALL FIELDS.", 400));
    }

    const user = await userModel.findById(req.user._id).select("+user_password");

    const isPasswordMatch = await user.comparePassword(oldPassword);

    if(!isPasswordMatch) {
        return next(new ErrorHandler("INCORRECT PASSWORD", 401));
    }
    
    user.user_password = newPassword;

    await user.save();

    res.status(200).json({
        success: true,
        message: "PASSWORD UPDATED SUCCESSFULLY."
    }); 
});

export const updateMemberProfile = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, dob } = req.body;

    const user = await userModel.findById(req.user._id);

    if(name) {
        user.user_name = name;
    }
    if(email) {
        user.user_email = email;
    }
    if(phone) {
        user.user_phone = phone;
    }
    if(dob) {
        user.user_dob = dob;
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: "PROFILE UPDATED SUCCESSFULLY."
    });

});

export const updateMemberProfilePicture = catchAsyncError(async (req, res, next) => {

    const user = await userModel.findById(req.user._id);

    const file = req.file;

    if(file) {
        const fileURI = getDataURI(file);
        const mycloud = await cloudinary.v2.uploader.upload(fileURI.content);
        await cloudinary.v2.uploader.destroy(user.user_avatar.public_id);
        user.user_avatar = {
            public_id: mycloud.public_id,
            url: mycloud.secure_url
        }
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: "PROFILE PICTURE UPDATED SUCCESSFULLY."
    });
});

export const memberForgotPassword = catchAsyncError(async (req, res, next) => {

    const { email } = req.body;

    if(!email) {
        return next(new ErrorHandler("PLEASE ENTER ALL FIELDS.", 400));
    }

    const user = await userModel.findOne({user_email: email});

    if(!user) {
        return next(new ErrorHandler("NO USER WITH THIS EMAIL EXISTS", 400));
    }

    const resetToken = await user.getResetToken();

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/api/v1/member/resetpassword/${resetToken}`;

    // SEND THIS RESET TOKEN VIA EMAIL

    const subject = "Libraly Reset Password";

    const message = `Click On The Link To Reset Your Password: ${resetUrl}`

    await sendEmail(email, subject, message);

    res.status(200).json({
        success: true,
        message: `RESET TOKEN HAS BEEN SENT TO ${email}`
    });
});

export const memberResetPassword = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await userModel.findOne({user_resetPasswordToken: resetPasswordToken, user_resetPasswordExpire: {$gt: Date.now()}});

    if(!user) {
        return next(new ErrorHandler("RESET PASSWORD TOKEN IS INVALID OR IS EXPIRED", 400));
    }

    user.user_password = req.body.password;

    user.user_resetPasswordToken = null;
    user.user_resetPasswordExpire = null;

    await user.save();

    res.status(200).json({
        success: true,
        message: "PASSWORD CHANGED SUCCESSFULLY."
    });

});