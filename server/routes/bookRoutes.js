import express from "express";
import {
    addBookAdmin,
    deleteBookAdmin,
    getAllBooksAdmin,
    getBookDetails,
    updateBookAdmin,
} from "../controllers/bookController.js";
import { authorizedSubscribers, isAuthenticated } from "../middlewares/auth.js";
import singleFileUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/book/all/:keyword").get(isAuthenticated, getAllBooksAdmin); // ADMIN
router
    .route("/organisation/addbook")
    .post(
        isAuthenticated,
        singleFileUpload,
        authorizedSubscribers,
        addBookAdmin
    );

router
    .route("/organisation/updatebook")
    .put(
        isAuthenticated,
        authorizedSubscribers,
        singleFileUpload,
        updateBookAdmin
    );

router
    .route(`/organisation/deletebook/:bookID`)
    .delete(isAuthenticated, authorizedSubscribers, deleteBookAdmin);

router
    .route("/organisation/book/:id")
    .get(isAuthenticated, authorizedSubscribers, getBookDetails);

export default router;
