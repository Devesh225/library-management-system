import express from "express";
import { getAllMembersAdmin, getMemberProfile, memberForgotPassword, memberLogin, memberLogout, memberResetPassword, updateMemberPassword, updateMemberProfile, updateMemberProfilePicture } from "../controllers/userController.js";
import { authorizedSubscribers, isAuthenticated } from "../middlewares/auth.js";
import singleFileUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/member/all").get(isAuthenticated, authorizedSubscribers, getAllMembersAdmin); // ADMIN
router.route("/member/login").post(memberLogin); // NORMAL
router.route("/member/logout").get(isAuthenticated, memberLogout); // AUTHENTICATED
router.route("/member/me").get(isAuthenticated, getMemberProfile); // AUTHENTICATED
router.route("/member/updatepassword").put(isAuthenticated, updateMemberPassword); // AUTHENTICATED
router.route("/member/updateprofile").put(isAuthenticated, updateMemberProfile); // AUTHENTICATED
router.route("/member/updateprofilepicture").put(isAuthenticated, singleFileUpload, updateMemberProfilePicture); // AUTHENTICATED
router.route("/member/forgotpassword").post(memberForgotPassword); // NORMAL
router.route("/member/resetpassword/:token").put(memberResetPassword); // NORMAL

export default router;