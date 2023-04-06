import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { sendEmail } from ".././utils/sendEmail.js";
import ErrorHandler from "../utils/errorHandler.js";

export const contact = catchAsyncError(async (req, res, next) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return next(new ErrorHandler("PLEASE ENTER ALL FIELDS", 400));
    }
    const to = process.env.SELF_MAIL;
    const subject = "Query From Libraly";
    const msg = `User: ${name} \n Email: ${email} \n ${message}`;
    await sendEmail(to, subject, msg);
    res.status(200).json({
        success: true,
        message: "MAIL SENT SUCCESSFULLY",
    });
});
