import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

    book_title: {
        type: String,
        required: [true, "TITLE OF THE BOOK IS REQUIRED"]
    },

    book_author: {
        type: String,
        required: [true, "NAME OF THE AUTHOR IS REQUIRED"]
    },

    book_publisher: {
        type: String,
        required: [true, "NAME OF THE PUBLISHER IS REQUIRED"]
    },

    book_year_of_publication: {
        type: Date,
        required: [true, "YEAR OF PUBLICATION IS REQUIRED"]
    },
  
    book_isbn: {
        type: String,
        required: [true, "ISBN NUMBER IS REQUIRED"],
        unique: true
    },

    book_subject: {
        type: String,
        required: [true, "SUBJECT OF THE BOOK IS REQUIRED"]
    },

    book_number_of_pages: {
        type: Number
    },

    book_available_copies: {
        type: Number,
        required: [true, "NUMBER OF AVAILABLE COPIES IS REQUIRED"],
        min: 1
    },

    book_total_copies: {
        type: Number,
        required: [true, "NUMBER OF MAXIMUM COPIES IS REQUIRED"], 
    },

    book_waiting_queue: {
        type: Number
    },

    book_cover: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },

});

export const bookModel = mongoose.model("books", bookSchema);