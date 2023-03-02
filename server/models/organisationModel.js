import mongoose from "mongoose";
import validator from "validator";

const organisationSchema = new mongoose.Schema({

    organisation_id: {
        type: Number,
        required: [true, "ORGANISATION ID NOT ENTERED"],
        unique: true
    },

    organisation_name: {
        type: String,
        required: [true, "ORGANISATION NAME NOT ENTERED"]
    },

    organisation_address: {
        type: String,
        required: [true, "ORGANISATION ADDRESS NOT ENTERED"]
    },

    organisation_email: {
        type: String,
        required: [true, "ORGANISATION EMAIL NOT ENTERED"],
        unique: true,
        validate: validator.isEmail,
    },

    organisation_phone: {
        type: Number,
        required: [true, "ORGANISATION PHONE NOT ENTERED"]
    },

    organisation_password: {
        type: String,
        required: [true, "ORGANISATION PASSWORD NOT ENTERED"],
        minLength: [6, "PASSWORD MUST BE ATLEAST 6 CHARACTERS LONG"],
        select: false
    },

    organisation_type: {
        type: String,
        enum: ["institute", "nonInstitute"],
        default: "institute"
    },

    organisation_subscription: {
        type: String,
        status: String
    },

    organisation_createdAt: {
        type: Date,
        default: Date.now
    },

    organisation_resetPasswordToken: {
        type: String
    },

    organisation_resetPasswordExpire: {
        type: String
    }

});

export const organisationModel = mongoose.model("organisations", organisationSchema);