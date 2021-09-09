import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
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
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("UserVerification", verificationSchema);
