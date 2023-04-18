import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    organisation_id: {
        type: Number,
        required: [true, "ORGANISATION ID NOT ENTERED"],
    },

    organisation_name: {
        type: String,
        required: [true, "ORGANISATION NAME NOT ENTERED"],
    },

    // UNIVERSITY ROLL FOR STUDENTS, NORMAL ID FOR MEMBERS OF NON INSTITUTE.
    user_id: {
        type: Number,
        required: [true, "MEMBER ID NOT ENTERED"],
    },

    user_name: {
        type: String,
        required: [true, "MEMBER NAME NOT PROVIDED"],
    },

    user_email: {
        type: String,
        required: [true, "USER EMAIL NOT ENTERED"],
        unique: true,
        validate: validator.isEmail,
    },

    user_phone: {
        type: Number,
        required: [true, "USER PHONE NOT ENTERED"],
    },

    user_password: {
        type: String,
        required: [true, "USER PASSWORD NOT ENTERED"],
        minLength: [6, "PASSWORD MUST BE ATLEAST 6 CHARACTERS LONG"],
        select: false,
    },

    user_dob: {
        type: Number,
        required: [true, "DATE OF BIRTH NOT PROVIDED FOR MEMBER"],
    },

    user_avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },

    user_createdAt: {
        type: Date,
        default: Date.now,
    },

    user_resetPasswordToken: {
        type: String,
    },

    user_resetPasswordExpire: {
        type: String,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("user_password")) {
        return next();
    }

    this.user_password = await bcrypt.hash(this.user_password, 10);
    next();
});

userSchema.methods.getJwtToken = function () {
    return jwt.sign(
        { _id: this._id, _type: "member" },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    );
};

userSchema.methods.comparePassword = async function (user_password) {
    return await bcrypt.compare(user_password, this.user_password);
};

userSchema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.user_resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.user_resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 MINS
    return resetToken;
};

export const userModel = mongoose.model("users", userSchema);
