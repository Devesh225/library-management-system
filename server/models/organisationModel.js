import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const organisationSchema = new mongoose.Schema({
    organisation_id: {
        type: Number,
        required: [true, "ORGANISATION ID NOT ENTERED"],
        unique: true,
    },

    organisation_logo: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },

    organisation_name: {
        type: String,
        required: [true, "ORGANISATION NAME NOT ENTERED"],
    },

    organisation_address: {
        type: String,
        required: [true, "ORGANISATION ADDRESS NOT ENTERED"],
    },

    organisation_subscription: {
        id: String,
        status: String,
    },

    organisation_email: {
        type: String,
        required: [true, "ORGANISATION EMAIL NOT ENTERED"],
        unique: true,
        validate: validator.isEmail,
    },

    organisation_phone: {
        type: Number,
        required: [true, "ORGANISATION PHONE NOT ENTERED"],
    },

    organisation_password: {
        type: String,
        required: [true, "ORGANISATION PASSWORD NOT ENTERED"],
        minLength: [6, "PASSWORD MUST BE ATLEAST 6 CHARACTERS LONG"],
        select: false,
    },

    organisation_createdAt: {
        type: Date,
        default: Date.now,
    },

    organisation_resetPasswordToken: {
        type: String,
    },

    organisation_resetPasswordExpire: {
        type: String,
    },
});

organisationSchema.pre("save", async function (next) {
    if (!this.isModified("organisation_password")) {
        return next();
    }

    this.organisation_password = await bcrypt.hash(
        this.organisation_password,
        10
    );
    next();
});

organisationSchema.methods.getJwtToken = function () {
    return jwt.sign(
        { _id: this._id, _type: "organisation" },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    );
};

organisationSchema.methods.comparePassword = async function (
    organisation_password
) {
    return await bcrypt.compare(
        organisation_password,
        this.organisation_password
    );
};

organisationSchema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.organisation_resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.organisation_resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 MINS
    return resetToken;
};

export const organisationModel = mongoose.model(
    "organisations",
    organisationSchema
);
