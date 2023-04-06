import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { bookModel } from "../models/bookModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllBooksAdmin = catchAsyncError(async (req, res, next) => {
    const name = req.query.name || "";
    const author = req.query.author || "";
    const category = req.query.category || "";

    const books = await bookModel.find({
        book_title: {
            $regex: name,
            $options: "i",
        },
        book_author: {
            $regex: author,
            $options: "i",
        },
        book_subject: {
            $regex: category,
            $options: "i",
        },
    });

    res.status(200).json({
        success: true,
        books,
    });
});
