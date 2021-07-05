import mongoose from "mongoose";

// we dont store the postId here to avoid redundancy, it's a one to many relationship (post with many comments)
const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // can't make an empty comment
        payload: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Comment", commentSchema);
