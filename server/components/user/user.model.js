import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9_-]+$/, "is invalid"],
            index: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, "is invalid"],
            index: true,
        },

        desc: {
            // description
            type: String,
            default: "No Description",
        },

        profile_pic: {
            type: String,
            default: "profile_pic_placeholder.png",
        },

        followers: {
            type: Array,
            default: [],
        },
        following: {
            type: Array,
            default: [],
        },

        notifications: {
            type: Array,
            default: [],
        },

        liked_posts: {
            type: Array,
            default: [],
        },

        saved_posts: {
            type: Array,
            default: [],
        },

        password: {
            type: String,
        },

        tag: {
            type: String,
            default: "Member",
        },

        tokenVersion: {
            type: Number,
            required: true,
            default: 0,
        },

        enabled: {
            type: Boolean,
            requred: true,
            default: true,
        },

        isGitHubUser: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);
