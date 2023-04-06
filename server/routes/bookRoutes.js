import express from "express";
import { getAllBooksAdmin } from "../controllers/bookController.js";
import { authorizedSubscribers, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/book/all").get(isAuthenticated, authorizedSubscribers, getAllBooksAdmin); // ADMIN

export default router;