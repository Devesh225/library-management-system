import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { organisationModel } from "../models/organisationModel.js";
import { userModel } from "../models/userModel.js";
import getDataURI from "../utils/dataURI.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import cloudinary from "cloudinary";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

export const getAllOrganisationsAdmin = catchAsyncError(
    async (req, res, next) => {
        const organisations = await organisationModel.find();
        res.status(200).json({
            success: true,
            organisations,
        });
    }
);

export const getOrganisationProfile = catchAsyncError(
    async (req, res, next) => {
        const organisation = await organisationModel.findById(
            req.organisation._id
        );
        res.status(200).json({
            success: true,
            organisation,
        });
    }
);

// CHECK AND TEST THIS CONTROLLER WHEN YOU RETURN
export const createOrganisationAdmin = catchAsyncError(
    async (req, res, next) => {
        const { name, address, email, phone, password } = req.body;

        if (!name || !address || !email || !phone || !password) {
            return next(new ErrorHandler("PLEASE ENTER ALL FIELDS.", 400));
        }

        let organisation = await organisationModel.findOne({
            organisation_email: email,
        });

        if (organisation) {
            return next(new ErrorHandler("ORGANISATION ALREADY EXISTS.", 409));
        }

        let lastOrgDoc = await organisationModel
            .find()
            .sort({ _id: -1 })
            .limit(1);

        let orgCount = 1;

        if (lastOrgDoc[0]) {
            let { organisation_id: lastOrgNumber } = lastOrgDoc[0];
            orgCount = lastOrgNumber + 1;
        }

        const file = req.file;

        let updatedOrganisationData = {
            public_id: process.env.CLOUDINARY_DEFAULT_AVATAR_PUBLIC_ID,
            url: process.env.CLOUDINARY_DEFAULT_AVATAR_URL,
        };

        if (file) {
            const fileURI = getDataURI(file);
            const mycloud = await cloudinary.v2.uploader.upload(
                fileURI.content
            );
            updatedOrganisationData.public_id = mycloud.public_id;
            updatedOrganisationData.url = mycloud.secure_url;
        }

        organisation = await organisationModel.create({
            organisation_id: orgCount,
            organisation_logo: {
                public_id: updatedOrganisationData.public_id,
                url: updatedOrganisationData.url,
            },
            organisation_name: name,
            organisation_address: address,
            organisation_email: email,
            organisation_phone: phone,
            organisation_password: password,
        });

        sendToken(
            res,
            organisation,
            null,
            "ORGANISATION REGISTERED SUCCESSFULLY",
            200
        );

        // TODO: MAIL THE ORGANISATION ID, PASSWORD AND OTHER DETAILS TO THE ORGANISATION EMAIL.
    }
);

export const organisationLogin = catchAsyncError(async (req, res, next) => {
    const { id, password } = req.body;
    const organisation = await organisationModel
        .findOne({ organisation_id: id })
        .select("+organisation_password");

    if (!organisation) {
        return next(new ErrorHandler("ORGANISATION DOES NOT EXIST", 401));
    }

    const isPasswordMatch = await organisation.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("INCORRECT ID OR PASSWORD", 401));
    }

    organisation.organisation_password = undefined;

    sendToken(
        res,
        organisation,
        null,
        "ORGANISATION LOGGED IN SUCCESSFULLY",
        200
    );
});

export const organisationLogout = catchAsyncError(async (req, res, next) => {
    res.status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            // secure: true,
            // sameSite: "None",
        })
        .json({
            success: true,
            message: "Logged Out Successfully.",
        });
});

export const updateOrganisationAdmin = catchAsyncError(
    async (req, res, next) => {
        const { name, address, email, phone } = req.body;
        const file = req.file;

        let organisation = await organisationModel.findById(
            req.organisation._id
        );

        let updatedOrgData = {};

        if (name) {
            updatedOrgData.organisation_name = name;
        }

        if (address) {
            updatedOrgData.organisation_address = address;
        }

        if (email) {
            updatedOrgData.organisation_email = email;
        }

        if (phone) {
            updatedOrgData.organisation_phone = phone;
        }

        if (file) {
            const fileURI = getDataURI(file);
            const mycloud = await cloudinary.v2.uploader.upload(
                fileURI.content
            );
            await cloudinary.v2.uploader.destroy(
                organisation.organisation_logo.public_id
            );
            updatedOrgData.organisation_logo = {
                public_id: mycloud.public_id,
                url: mycloud.secure_url,
            };
        }

        organisation = await organisationModel.findByIdAndUpdate(
            organisation._id,
            updatedOrgData,
            { new: true, runValidators: true }
        );

        await organisation.save();

        res.status(200).json({
            success: true,
            message: "ORGANISATION UPDATED SUCCESSFULLY.",
            organisation,
        });
    }
);

export const addMemberAdmin = catchAsyncError(async (req, res, next) => {
    const { user_name, user_email, user_phone, user_dob } = req.body;
    const file = req.file;

    if (!user_name || !user_email || !user_phone || !user_dob) {
        return next(new ErrorHandler("PLEASE ENTER ALL FIELDS.", 400));
    }

    if (user_dob.length !== 8) {
        return next(
            new ErrorHandler(
                "PLEASE ENTER DOB IN CORRECT FORMAT AND ORDER",
                400
            )
        );
    }

    const organisation = await organisationModel.findById(req.organisation._id);

    if (!organisation) {
        return next(
            new ErrorHandler(
                "YOU ARE NOT LOGGED IN OR YOU DO NOT HAVE THE PERMISSION.",
                400
            )
        );
    }

    let organisation_id = organisation.organisation_id;

    let orgNum = await organisationModel.findOne({ organisation_id });

    if (!orgNum) {
        return next(
            new ErrorHandler(
                "ORGANISATION WITH THE GIVEN ID DOES NOT EXIST",
                401
            )
        );
    }

    let orgName = await organisationModel.find({ organisation_id });

    let organisation_name = orgName[0].organisation_name;

    let updatedMemberData = {
        public_id: process.env.CLOUDINARY_DEFAULT_AVATAR_PUBLIC_ID,
        url: process.env.CLOUDINARY_DEFAULT_AVATAR_URL,
    };

    if (file) {
        const fileURI = getDataURI(file);
        const mycloud = await cloudinary.v2.uploader.upload(fileURI.content);
        updatedMemberData.public_id = mycloud.public_id;
        updatedMemberData.url = mycloud.secure_url;
    }

    let member = await userModel.findOne({ user_email });

    if (member) {
        return next(new ErrorHandler("MEMBER ALREADY EXISTS.", 409));
    }

    let lastUserOfOrg = await userModel
        .find({ organisation_id })
        .sort({ _id: -1 })
        .limit(1);

    let user_id = 1;

    if (lastUserOfOrg[0]) {
        user_id = lastUserOfOrg[0].user_id + 1;
    }

    try {
        member = await userModel.create({
            organisation_id,
            organisation_name,
            user_avatar: {
                public_id: updatedMemberData.public_id,
                url: updatedMemberData.url,
            },
            user_id,
            user_name,
            user_password: user_dob,
            user_email,
            user_phone,
            user_dob,
        });
    } catch (error) {
        return next(
            new ErrorHandler(
                "INTERNAL SERVER ERROR, PLEASE CHECK THE FORM DETAILS ONCE AGAIN.",
                409
            )
        );
    }

    // TODO: EMAIL THE LOGIN CREDENTIALS TO THE MEMBER.

    res.status(201).json({
        success: true,
        member,
        message: "MEMBER ADDED SUCCESSFULLY.",
    });
});

export const updateOrganisationPasswordAdmin = catchAsyncError(
    async (req, res, next) => {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmPassword) {
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

        const organisation = await organisationModel
            .findById(req.organisation._id)
            .select("+organisation_password");

        const isPasswordMatch = await organisation.comparePassword(oldPassword);

        if (!isPasswordMatch) {
            return next(new ErrorHandler("INCORRECT OLD PASSWORD", 401));
        }

        organisation.organisation_password = newPassword;

        await organisation.save();

        res.status(200).json({
            success: true,
            message: "PASSWORD UPDATED SUCCESSFULLY.",
        });
    }
);

export const removeMemberAdmin = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new ErrorHandler("PLEASE ENTER ALL FIELDS.", 401));
    }

    const member = await userModel.findOne({ user_email: email });

    if (!member) {
        return next(
            new ErrorHandler("MEMBER WITH THE GIVEN EMAIL DOES NOT EXIST.", 409)
        );
    }

    const organisation = await organisationModel.findById(req.organisation._id);

    if (member.organisation_id !== organisation.organisation_id) {
        return next(
            new ErrorHandler(
                "MEMBER DOES NOT EXIST OR DOES NOT BELONG TO YOUR ORGANISATION",
                409
            )
        );
    }

    await userModel.remove({ user_email: email });

    res.status(200).json({
        success: true,
        message: "MEMBER REMOVED SUCCESSFULLY.",
    });
});

export const searchSingleMemberWithId = catchAsyncError(
    async (req, res, next) => {
        const { id } = req.body;
        if (!id) {
            return next(new ErrorHandler("PLEASE ENTER ALL FIELDS.", 401));
        }
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return next(new ErrorHandler("INVALID MEMBER ID.", 401));
        }

        const member = await userModel.findById(id);

        if (!member) {
            return next(
                new ErrorHandler("MEMBER WITH THE GIVEN ID DOES NOT EXIST", 401)
            );
        }

        res.status(200).json({
            success: true,
            member,
        });
    }
);

export const getSingleMemberDetails = catchAsyncError(
    async (req, res, next) => {
        const member = await userModel.findById(req.params.id);
        if (!member) {
            return next(
                new ErrorHandler("MEMBER WITH THE ID DOES NOT EXIST", 401)
            );
        }
        res.status(200).json({
            success: true,
            member,
        });
    }
);

export const deleteOrganisationAdmin = catchAsyncError(
    async (req, res, next) => {
        const organisation = await userModel.findById(req.organisation._id);

        await organisationModel.findByIdAndDelete(organisation._id);

        res.status(200).json({
            success: true,
            message: "ORGANISATION DELETED SUCCESSFULLY.",
        });
    }
);

export const organisationForgotPasswordAdmin = catchAsyncError(
    async (req, res, next) => {
        const { email } = req.body;

        if (!email) {
            return next(new ErrorHandler("PLEASE ENTER ALL FIELDS.", 400));
        }

        const organisation = await organisationModel.findOne({
            organisation_email: email,
        });

        if (!organisation) {
            return next(
                new ErrorHandler("NO ORGANISATION WITH THIS EMAIL EXISTS", 400)
            );
        }

        const resetToken = await organisation.getResetToken();

        await organisation.save();

        const resetUrl = `${process.env.FRONTEND_URL}/organisation/resetpassword/${resetToken}`;

        // SEND THIS RESET TOKEN VIA EMAIL

        const subject = "Libraly Reset Password";

        const message = `Click On The Link To Reset Your Password: ${resetUrl}`;

        await sendEmail(email, subject, message);

        res.status(200).json({
            success: true,
            message: `RESET TOKEN HAS BEEN SENT TO ${email}`,
        });
    }
);

export const organisationResetPasswordAdmin = catchAsyncError(
    async (req, res, next) => {
        const { token } = req.params;
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
        const organisation = await organisationModel.findOne({
            organisation_resetPasswordToken: resetPasswordToken,
            organisation_resetPasswordExpire: { $gt: Date.now() },
        });

        if (!organisation) {
            return next(
                new ErrorHandler(
                    "RESET PASSWORD TOKEN IS INVALID OR IS EXPIRED",
                    400
                )
            );
        }

        organisation.organisation_password = req.body.password;

        organisation.organisation_resetPasswordToken = null;
        organisation.organisation_resetPasswordExpire = null;

        await organisation.save();

        res.status(200).json({
            success: true,
            message: "PASSWORD CHANGED SUCCESSFULLY.",
        });
    }
);
