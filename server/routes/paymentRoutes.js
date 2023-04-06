import express from "express";
import { cancelSubscription, createSubscription, getRazorpayKey, paymentVerification } from "../controllers/paymentController.js";
import { authorizedSubscribers, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/organisation/subscribe").get(isAuthenticated, createSubscription);
router.route("/organisation/paymentverification").post(isAuthenticated, paymentVerification);
router.route("/organisation/razorpaykey").get(getRazorpayKey)
router.route("/organisation/cancelsubscription").delete(isAuthenticated, authorizedSubscribers, cancelSubscription);

export default router;