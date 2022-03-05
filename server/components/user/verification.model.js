import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
            unique: true,
        },
        pending: {
            type: Boolean,
            required: true,
            default: true,
        },
        corresponding_email: {
            type: String,
            required: true,
        },
        corresponding_username: {
            type: String,
            required: true,
        },
        // can be:
        //  - reset_pwd
        //  - deletion
        //  - verify
        type: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("UserVerification", verificationSchema);
