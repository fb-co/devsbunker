import mongoose from "mongoose";
import PostLimits from "./post_limits.js";

// we dont store the postId here to avoid redundancy, it's a one to many relationship (post with many comments)
const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
        // can't make an empty comment
        payload: {
            type: String,
            required: true,
        },
        replies: {
            type: Array,
        },
    },
    {
        timestamps: true,
    }
);

// limit the max comment length
commentSchema.path("payload").validate((payload) => {
    return payload.length <= PostLimits.maxCommentLength;
}, `The maximum comment length is ${PostLimits.maxCommentLength}`);

export default mongoose.model("Comment", commentSchema);
