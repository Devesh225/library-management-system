import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    member_id: {
        type: Number,
        ref: "users",
        required: true,
    },

    book_isbn: {
        type: String,
        ref: "books",
        required: true,
    },

    member_name: {
        type: String,
        required: true,
    },

    book_name: {
        type: String,
    },

    book_available_copies: {
        type: Number,
    },

    requestType: {
        type: String,
    },
});

export const requestModel = mongoose.model("request", requestSchema);
