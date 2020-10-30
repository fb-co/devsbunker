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
/* Im getting rid of these for now because they were causing errors and not letting the post documents get created
postSchema.path("githubLink").validate((url) => {
    const regex = /http(s)?:\/\/github.com/;
    return regex.test(url);
}, "Invalid GitHub URL.");

postSchema.path("otherLink").validate((url) => {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return regex.test(url);
}, "Invalid URL.");

postSchema.path("bunkerTag").validate((bunker) => {
    return Languages.includes(bunker);
}, "Invalid Bunker tag.");

*/

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
