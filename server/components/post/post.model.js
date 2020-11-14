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
        likes: {
            type: Array,
        },
        price: {
            type: Number,
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
    /*
    (https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})

    Will match the following cases

        http://www.foufos.gr
        https://www.foufos.gr
        http://foufos.gr
        http://www.foufos.gr/kino
        http://werer.gr
        www.foufos.gr
        www.mp3.com
        www.t.co
        http://t.co
        http://www.t.co
        https://www.t.co
        www.aa.com
        http://aa.com
        http://www.aa.com
        https://www.aa.com

    Will NOT match the following

        www.foufos
        www.foufos-.gr
        www.-foufos.gr
        foufos.gr
        http://www.foufos
        http://foufos
        www.mp3#.com

    */
    const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
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
