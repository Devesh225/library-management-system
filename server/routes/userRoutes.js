import express from "express";
import {
    getMemberProfile,
    memberForgotPassword,
    memberLogin,
    memberLogout,
    memberResetPassword,
    updateMemberPassword,
    updateMemberProfile,
} from "../controllers/userController.js";
import { authorizedSubscribers, isAuthenticated } from "../middlewares/auth.js";
import singleFileUpload from "../middlewares/multer.js";
import {
    issueBook,
    recommendedBooksMember,
    returnBook,
    viewCurrentlyIssuedBooks,
    viewReturnedBooksHistory,
} from "../controllers/bookController.js";

const router = express.Router();

router.route("/member/login").post(memberLogin); // NORMAL
router.route("/member/logout").get(isAuthenticated, memberLogout); // AUTHENTICATED
router.route("/member/me").get(isAuthenticated, getMemberProfile); // AUTHENTICATED
router
    .route("/member/updatepassword")
    .put(isAuthenticated, updateMemberPassword); // AUTHENTICATED
router
    .route("/member/updateprofile")
    .put(isAuthenticated, singleFileUpload, updateMemberProfile); // AUTHENTICATED

router.route("/member/forgotpassword").post(memberForgotPassword); // NORMAL
router.route("/member/resetpassword/:token").put(memberResetPassword); // NORMAL

router.route("/member/issuebook").post(isAuthenticated, issueBook);
router.route("/member/returnbook").post(isAuthenticated, returnBook);
router
    .route("/member/recommendedbooks")
    .get(isAuthenticated, recommendedBooksMember);

router
    .route("/member/allissuedbooks")
    .get(isAuthenticated, viewCurrentlyIssuedBooks);
router
    .route("/member/allreturnedbooks")
    .get(isAuthenticated, viewReturnedBooksHistory);

export default router;
