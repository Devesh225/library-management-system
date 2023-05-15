import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { bookModel } from "../models/bookModel.js";
import { borrowedBooksModel } from "../models/borrowedBookModel.js";
import { organisationModel } from "../models/organisationModel.js";
import { userModel } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

export const getAllBooksAdmin = catchAsyncError(async (req, res, next) => {
    const name = req.query.name || "";
    const author = req.query.author || "";
    const category = req.query.category || "";

    let orgID = null;

    if (req.organisation) {
        const org_id = req.organisation._id;
        const org = await organisationModel.findById(org_id);
        orgID = org.organisation_id;
    } else {
        const memberID = req.member._id;
        const member = await userModel.findById(memberID);
        orgID = member.organisation_id;
    }

    const books = await bookModel.find({
        organisation_id: orgID,
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

export const addBookAdmin = catchAsyncError(async (req, res, next) => {
    const orgID = req.organisation._id;

    const organisation = await organisationModel.findById(orgID);

    const organisation_id = organisation.organisation_id;

    const {
        title,
        author,
        publisher,
        yop,
        isbn,
        subject,
        nop,
        availableCount,
        totalCapacity,
    } = req.body;

    if (
        !title ||
        !author ||
        !publisher ||
        !yop ||
        !isbn ||
        !subject ||
        !nop ||
        !availableCount ||
        !totalCapacity
    ) {
        return next(new ErrorHandler("PLEASE ENTER ALL FIELDS.", 400));
    }

    if (Number(availableCount) > Number(totalCapacity)) {
        return next(
            new ErrorHandler(
                "AVAILABILITY CANNOT EXCEED THE TOTAL CAPACITY OF THE PARTICULAR BOOK.",
                400
            )
        );
    }

    let book = await bookModel.findOne({
        book_isbn: isbn,
    });

    if (book) {
        return next(new ErrorHandler("BOOK ALREADY EXISTS.", 409));
    }

    const file = req.file;

    let updatedBookData = {
        public_id: process.env.CLOUDINARY_DEFAULT_BOOK_COVER_PUBLIC_ID,
        url: process.env.CLOUDINARY_DEFAULT_BOOK_COVER_URL,
    };

    if (file) {
        const fileURI = getDataURI(file);
        const mycloud = await cloudinary.v2.uploader.upload(fileURI.content);
        updatedBookData.public_id = mycloud.public_id;
        updatedBookData.url = mycloud.secure_url;
    }

    book = await bookModel.create({
        organisation_id,
        book_cover: {
            public_id: updatedBookData.public_id,
            url: updatedBookData.url,
        },
        book_title: title,
        book_author: author,
        book_publisher: publisher,
        book_year_of_publication: yop,
        book_isbn: isbn,
        book_subject: subject,
        book_number_of_pages: nop,
        book_available_copies: availableCount,
        book_total_copies: totalCapacity,
    });

    res.status(200).json({
        success: true,
        book,
        message: "BOOK ADDED SUCCESSFULLY.",
    });
});

export const issueBook = catchAsyncError(async (req, res, next) => {
    const memberID = req.member._id;
    const member = await userModel.findById(memberID);
    const { bookID } = req.body;
    if (!bookID) {
        return next(new ErrorHandler("PLEASE SELECT THE BOOK CORRECTLY.", 400));
    }

    let book = await bookModel.findById(bookID);
    if (!book) {
        return next(new ErrorHandler("PLEASE TRY AGAIN.", 400));
    }
    const isBookIssued = await borrowedBooksModel.find({
        borrowedBook_user_id: memberID,
        borrowedBook_book_id: book._id,
        borrowedBook_is_returned: false,
    });

    const isBookReturned = await borrowedBooksModel.find({
        borrowedBook_user_id: memberID,
        borrowedBook_book_id: book._id,
        borrowedBook_is_returned: true,
    });

    if (isBookIssued[0]) {
        return next(new ErrorHandler("BOOK IS ALREADY ISSUED.", 400));
    }

    if (isBookReturned[0]) {
        await borrowedBooksModel.findByIdAndDelete(isBookReturned[0]._id);
    }

    if (book.book_available_copies > 1) {
        const borrowedBook = await borrowedBooksModel.create({
            borrowedBook_user_id: memberID,
            borrowedBook_book_id: book._id,
            borrowedBook_borrowed_date: Date.now(),
            borrowedBook_due_date: Date.now() + 15 * 24 * 60 * 60 * 1000,
        });
        if (!borrowedBook) {
            return next(
                new ErrorHandler("COULDN'T ISSUE BOOK, PLEASE TRY AGAIN", 400)
            );
        }
        book.book_available_copies = book.book_available_copies - 1;
        if (book.book_waiting_queue > 0) {
            book.book_waiting_queue = book.book_waiting_queue - 1;
        }
        book.save();

        let issueDate = borrowedBook.borrowedBook_borrowed_date;
        let returnDate = borrowedBook.borrowedBook_due_date;
        let subject = "[ LIBRALY ] BOOK ISSUED.";

        let message = `You have issued a book: ${
            book.book_title
        }.\n\nIssue Date: ${String(issueDate).substring(
            0,
            15
        )}\n\nMax Return Date: ${String(returnDate).substring(0, 15)}`;

        await sendEmail(member.user_email, subject, message);

        res.status(200).json({
            success: true,
            message: "BOOK ISSUED SUCCESSFULLY.",
            borrowedBook,
        });
        return;
    } else {
        book.book_waiting_queue = book.book_waiting_queue + 1;
        book.save();
        return next(
            new ErrorHandler(
                "THIS BOOK IS NOT AVAILABLE CURRENTLY, YOU WILL BE ADDED TO THE WAITING QUEUE.",
                400
            )
        );
    }
});

export const returnBook = catchAsyncError(async (req, res, next) => {
    const memberID = req.member._id;
    const member = await userModel.findById(memberID);
    const { bookID } = req.body;
    if (!bookID) {
        return next(new ErrorHandler("PLEASE SELECT THE BOOK CORRECTLY.", 400));
    }

    let book = await bookModel.findById(bookID);
    if (!book) {
        return next(new ErrorHandler("PLEASE TRY AGAIN.", 400));
    }
    let borrowedBook = await borrowedBooksModel.find({
        borrowedBook_book_id: bookID,
        borrowedBook_user_id: memberID,
    });
    if (borrowedBook.borrowedBook_is_returned) {
        return next(new ErrorHandler("BOOK HAS ALREADY BEEN RETURNED.", 400));
    }
    borrowedBook = await borrowedBooksModel.findOneAndUpdate(
        {
            borrowedBook_book_id: bookID,
            borrowedBook_user_id: memberID,
        },
        {
            borrowedBook_returned_date: Date.now(),
            borrowedBook_is_returned: true,
        },
        { new: true }
    );
    book.book_available_copies = book.book_available_copies + 1;
    book.save();
    let lateDays = 0;
    if (
        borrowedBook.borrowedBook_returned_date >
        borrowedBook.borrowedBook_due_date
    ) {
        lateDays =
            Math.floor(
                borrowedBook_returned_date - borrowedBook_borrowed_date
            ) /
            (1000 * 60 * 60 * 24);
    }
    const lateFine = lateDays * 10; // 10 RUPEES PER DAY FINE

    let issueDate = borrowedBook.borrowedBook_borrowed_date;
    let returnDate = borrowedBook.borrowedBook_returned_date;
    let subject = "[ LIBRALY ] BOOK ISSUED.";

    let message = `You have returned a book: ${
        book.book_title
    }.\n\nIssue Date: ${String(issueDate).substring(
        0,
        15
    )}\n\nReturn Date: ${String(returnDate).substring(
        0,
        15
    )}\n\nLate Fine: Rs. ${lateFine}`;

    await sendEmail(member.user_email, subject, message);
    res.status(200).json({
        success: true,
        lateFine,
        message: "BOOK RETURNED SUCCESSFULLY.",
        borrowedBook,
    });
});

export const viewCurrentlyIssuedBooks = catchAsyncError(
    async (req, res, next) => {
        const memberID = req.member._id;
        const issuedBooks = await borrowedBooksModel.find({
            borrowedBook_user_id: memberID,
            borrowedBook_is_returned: false,
        });
        let borrowedBooksID = [];
        issuedBooks.map((book) => {
            borrowedBooksID.push(book.borrowedBook_book_id);
        });

        let books = [];
        for (const id of borrowedBooksID) {
            const book = await bookModel.findById(id);
            books.push(book);
        }

        res.status(200).json({
            success: true,
            books,
            issuedBooks,
        });
    }
);

export const viewReturnedBooksHistory = catchAsyncError(
    async (req, res, next) => {
        const memberID = req.member._id;
        const returnedBooks = await borrowedBooksModel.find({
            borrowedBook_user_id: memberID,
            borrowedBook_is_returned: true,
        });

        let returnedBooksID = [];
        returnedBooks.map((book) => {
            returnedBooksID.push(book.borrowedBook_book_id);
        });

        let books = [];
        for (const id of returnedBooksID) {
            const book = await bookModel.findById(id);
            books.push(book);
        }
        res.status(200).json({
            success: true,
            books,
            returnedBooks,
        });
    }
);

export const updateBookAdmin = catchAsyncError(async (req, res, next) => {
    const {
        title,
        author,
        publisher,
        yop,
        isbn,
        subject,
        nop,
        availableCount,
        totalCapacity,
    } = req.body;

    const orgID = req.organisation._id;
    const organisation = await organisationModel.findById(orgID);
    const organisation_id = organisation.organisation_id;
    const file = req.file;

    let updatedBookData = {};

    if (title) {
        updatedBookData.book_title = title;
    }

    if (author) {
        updatedBookData.book_author = author;
    }

    if (publisher) {
        updatedBookData.book_publisher = publisher;
    }

    if (yop) {
        updatedBookData.book_year_of_publication = Number(yop);
    }

    if (subject) {
        updatedBookData.book_subject = subject;
    }
    if (nop) {
        updatedBookData.book_number_of_pages = Number(nop);
    }
    if (availableCount) {
        updatedBookData.book_available_copies = Number(availableCount);
    }
    if (totalCapacity) {
        updatedBookData.book_total_copies = Number(totalCapacity);
    }

    if (Number(availableCount) > Number(totalCapacity)) {
        return next(
            new ErrorHandler(
                "AVAILABILITY CANNOT EXCEED THE TOTAL CAPACITY OF THE PARTICULAR BOOK.",
                400
            )
        );
    }

    if (file) {
        const fileURI = getDataURI(file);
        const mycloud = await cloudinary.v2.uploader.upload(fileURI.content);
        await cloudinary.v2.uploader.destroy(book.book_cover.public_id);
        updatedBookData.book_cover = {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        };
    }

    let book = await bookModel.find({
        organisation_id,
        book_isbn: isbn,
    });

    book = book[0];

    book = await bookModel.findByIdAndUpdate(book._id, updatedBookData, {
        new: true,
        runValidators: true,
    });

    await book.save();

    res.status(200).json({
        success: true,
        message: "BOOK UPDATED SUCCESSFULLY.",
        book,
    });
});

export const deleteBookAdmin = catchAsyncError(async (req, res, next) => {
    const { bookID } = req.params;
    if (!bookID) {
        return next(new ErrorHandler("PLEASE SELECT THE BOOK CORRECTLY.", 400));
    }

    await bookModel.remove({ _id: bookID });

    res.status(200).json({
        success: true,
        message: "BOOK REMOVED SUCCESSFULLY.",
    });
});

export const recommendedBooksMember = catchAsyncError(
    async (req, res, next) => {
        const member = req.member._id;
        const books = await borrowedBooksModel.find({
            borrowedBook_user_id: member._id,
        });
        let categories = [];
        for (const borrowedBook of books) {
            const book = await bookModel.findById(
                borrowedBook.borrowedBook_book_id
            );
            categories.push(book.book_subject);
        }
        let uniqueCategories = [...new Set(categories)];
        const orgID = member.organisation_id;
        const recommendedBooks = await bookModel.find({
            organisation_id: orgID,
            book_subject: { $in: uniqueCategories },
        });
        res.status(200).json({
            success: true,
            recommendedBooks,
        });
    }
);

export const getBookDetails = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    if (!book) {
        return next(new ErrorHandler("BOOK DOESN'T EXIST", 400));
    }
    res.status(200).json({
        success: true,
        book,
    });
});
