import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { userModel } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

export const getAllMembersAdmin = (req, res, next) => {
    res.send("GET ALL MEMBERS ADMIN IS WORKING");
}

export const memberLogin = catchAsyncError(async (req, res, next) => {
    const {user_email, user_password} = req.body;
    
    if(!user_email || !user_password) {
        return next(new ErrorHandler("PLEASE ENTER ALL FIELDS.", 400));
    }

    const member = await userModel.findOne({ user_email }).select("+user_password");

    if(!member) {
        return next(new ErrorHandler("INCORRECT EMAIL OR PASSWORD", 401));
    }

    const isPasswordMatch = await member.comparePassword(user_password);

    if(!isPasswordMatch) {
        return next(new ErrorHandler("INCORRECT EMAIL OR PASSWORD", 401));
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