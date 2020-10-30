import Languages from "../languages/languages.list.js";
import mongoose from "mongoose";

const requiredString = {
    type: String,
    required: true,
};

const postSchema = new mongoose.Schema(
    {
        title: requiredString,
        author: requiredString,
        description: {
            type: String,
        },
        thumbnail: {
            // [!] check notes [!]
            type: String,
        },
        images: {
            type: Array,
        },
        links: {
            type: Array,
        },
        collaborators: {
            type: Array,
        },
        tags: {
            type: Array,
        },
        bunkerTag: requiredString,
        clip: {
            type: String, // [!] check notes [!]
        },
    },
    {
        timestamps: true,
    }
);

// validating fields
postSchema.path("links").validate((urls) => {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    let valid = true;

    urls.forEach((link) => {
        valid = regex.test(link);
    });

    return valid;
}, "Invalid URL.");

postSchema.path("tags").validate((tags) => {
    let valid = true;
    tags.forEach((tag) => {
        valid = Languages.includes(tag);
    });
    return valid;
}, "Invalid Bunker tag.");

export default mongoose.model("Post", postSchema);

/*

NOTES:
since I don't know how we will handle file uploads I thought of
storing the path fot the uploaded file in the db and so store the
file in the HDD.

Since files will be, hopefully, less than 16mb we could store
them directly to the db w/o needing Gridfs


noted!
*/
