import express from "express";
import { addMemberAdmin, getAllOrganisationsAdmin } from "../controllers/organisationController.js";

const router = express.Router();

router.route("/organisations").get(getAllOrganisationsAdmin);
router.route("/member/add").post(addMemberAdmin);

export default router;