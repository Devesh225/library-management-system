import mongoose from "mongoose";

const borrowedBookSchema = new mongoose.Schema({
    
    borrowedBook_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    borrowedBook_book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books',
        required: true
    },

    borrowedBook_borrowed_date: {
        type: Date,
        required: true
    },

    borrowedBook_due_date: {
        type: Date,
        required: true
    },

    borrowedBook_returned_date: {
        type: Date
    },

    borrowedBook_is_returned: {
        type: Boolean,
        default: false
    },

});

export const borrowedBooksModel = mongoose.model('borrowedbooks', borrowedBookSchema);