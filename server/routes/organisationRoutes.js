import express from "express";
import { addMemberAdmin, createOrganisationAdmin, deleteOrganisationAdmin, getAllOrganisationsAdmin, getSingleMemberDetails, organisationForgotPasswordAdmin, organisationLogin, organisationLogout, organisationResetPasswordAdmin, removeMemberAdmin, searchSingleMemberWithId, updateOrganisationAdmin, updateOrganisationPasswordAdmin } from "../controllers/organisationController.js";
import { authorizedSubscribers, isAuthenticated } from "../middlewares/auth.js";
import singleFileUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/organisation/all").get(isAuthenticated, getAllOrganisationsAdmin);
router.route("/member/add").post(isAuthenticated, authorizedSubscribers,singleFileUpload ,addMemberAdmin);
router.route("/organisation/update").put(isAuthenticated, authorizedSubscribers, singleFileUpload, updateOrganisationAdmin);
router.route("/organisation/login").post(organisationLogin);
router.route("/organisation/logout").get(isAuthenticated, authorizedSubscribers, organisationLogout);
router.route("/organisation/updatepassword").put(isAuthenticated, authorizedSubscribers, updateOrganisationPasswordAdmin); // AUTHENTICATED
router.route("/organisation/delete").delete(isAuthenticated, authorizedSubscribers, deleteOrganisationAdmin);
router.route("/organisation/new").post(singleFileUpload, createOrganisationAdmin);
router.route("/member/remove").delete(isAuthenticated, authorizedSubscribers, removeMemberAdmin);
router.route("/member/search").get(isAuthenticated, authorizedSubscribers, searchSingleMemberWithId);
router.route("/organisation/forgotpassword").post(organisationForgotPasswordAdmin); // NORMAL
router.route("/organisation/resetpassword/:token").put(organisationResetPasswordAdmin); // NORMAL
router.route("/member/:id").get(isAuthenticated, authorizedSubscribers, getSingleMemberDetails);
 
export default router;