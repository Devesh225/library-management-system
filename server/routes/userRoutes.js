import express from "express";
import { getAllMembersAdmin, memberLogin, memberLogout } from "../controllers/userController.js";

const router = express.Router();

router.route("/member/all").get(getAllMembersAdmin);
router.route("/member/login").post(memberLogin);
router.route("/member/logout").get(memberLogout);

export default router;