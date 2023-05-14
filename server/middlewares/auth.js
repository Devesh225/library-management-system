import jwt from "jsonwebtoken";
import { organisationModel } from "../models/organisationModel.js";
import { userModel } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("USER NOT LOGGED IN.", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedData._type === "organisation") {
        req.organisation = await organisationModel.findById(decodedData._id);
    } else if (decodedData._type === "member") {
        req.member = await userModel.findById(decodedData._id);
    }
    next();
});

export const authorizedSubscribers = catchAsyncError((req, res, next) => {
    if (req.organisation.organisation_subscription.status !== "active") {
        return next(
            new ErrorHandler(
                "PLEASE BUY A SUBSCRIPTION PLAN BEFORE ACCESSSING THIS RESOURCE",
                403
            )
        );
    }
    return next();
});
