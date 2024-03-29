import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { organisationModel } from "../models/organisationModel.js";
import { razorpayInstance } from "../server.js";
import crypto from "crypto";
import { paymentModel } from "../models/paymentModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createSubscription = catchAsyncError(async (req, res, next) => {
    const organisation = await organisationModel.findById(req.organisation._id);
    let planID = null;
    const { plan } = req.body;

    if (plan === "Basic") {
        planID = process.env.PLAN_BASIC_ID;
    } else if (plan === "Pro") {
        planID = process.env.PLAN_PRO_ID;
    } else if (plan === "Premium") {
        planID = process.env.PLAN_PREMIUM_ID;
    } else {
        return next(new ErrorHandler("NO PLAN SELECTED, TRY AGAIN.", 400));
    }

    const subscription = await razorpayInstance.subscriptions.create({
        plan_id: planID,
        customer_notify: 1,
        total_count: 3,
    });

    if (!subscription) {
        return next(new ErrorHandler("PLEASE SELECT A PACKAGE.", 400));
    }

    organisation.organisation_subscription.id = subscription.id;
    organisation.organisation_subscription.status = subscription.status;

    console.log(organisation.organisation_subscription.status);

    await organisation.save();

    return res.status(201).json({
        success: true,
        subscriptionID: subscription.id,
    });
});

export const paymentVerification = catchAsyncError(async (req, res, next) => {
    const {
        razorpay_payment_id,
        razorpay_subscription_id,
        razorpay_signature,
    } = req.body;
    const organisation = await organisationModel.findById(req.organisation._id);

    const subscription_id = organisation.organisation_subscription.id;

    const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
        .digest("hex");

    const isAuthenticSignature = generated_signature === razorpay_signature;

    if (!isAuthenticSignature) {
        return res.redirect(`${process.env.FRONTEND_URL}/paymentfailed`);
    }

    await paymentModel.create({
        razorpay_payment_id,
        razorpay_subscription_id,
        razorpay_signature,
    });

    organisation.organisation_subscription.status = "active";

    await organisation.save();

    res.redirect(
        `${process.env.FRONTEND_URL}/paymentsuccessful?reference=${razorpay_payment_id}`
    );
});

export const getRazorpayKey = catchAsyncError(async (req, res, next) => {
    return res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_API_KEY,
    });
});

export const cancelSubscription = catchAsyncError(async (req, res, next) => {
    const organisation = await organisationModel.findById(req.organisation._id);
    const subscriptionID = organisation.organisation_subscription.id;
    let refund = false;
    await razorpayInstance.subscriptions.cancel(subscriptionID);

    const payment = await paymentModel.findOne({
        razorpay_subscription_id: subscriptionID,
    });

    const timeGap = Date.now() - payment.createdAt;

    const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000; // MILISECONDS

    if (refundTime > timeGap) {
        await razorpayInstance.payments.refund(payment.razorpay_payment_id);
        refund = true;
    }

    await payment.remove();

    organisation.organisation_subscription.id = undefined;
    organisation.organisation_subscription.status = undefined;

    await organisation.save();

    return res.status(200).json({
        success: true,
        message: refund
            ? "SUBSCRIPTION CANCELLED. YOU WILL GET THE REFUND WITHIN 7 BUSINESS DAYS."
            : "SUBSCRIPTION CANCELLED. THERE WILL BE NO REFUND AS THE SUBSCRIPTION WAS USED BEYOND THE TRIAL PERIOD.",
    });
});
