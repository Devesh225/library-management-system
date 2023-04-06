import express from "express";
import { contact } from "../controllers/otherController.js";

const router = express.Router();

router.route("/contact").post(contact);

export default router;
