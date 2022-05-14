import Languages from "../languages/languages.list.js";
import mongoose from "mongoose";
import PostLimits from "./post_limits.js";

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
            validate: {
                validator: async function (tags) {
                    let valid = true;
                    let canMakeCustomTags = false;

                    const postsMade = await mongoose.model("Post", postSchema).find({ author: this.author });
                    if (postsMade.length >= 5) {
                        canMakeCustomTags = true;
                    }

                    if (!canMakeCustomTags) {
                        for (const tag of tags) {
                            valid = Languages.isValid(tag);
                            if (!valid) break;
                        }
                    }

                    return valid;
                },
                message: (props) => `${props.value} is not a valid tag.`,
            },
        },
        likes: {
            type: Array,
        },
        views: {
            type: Number,
        },
        likeAmt: {
            type: Number,
        },
        price: {
            type: Number,
        },
        // Array<Comment>
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        enabled: {
            type: Boolean,
            required: true,
            default: true,
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
    const regex =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    let valid = true;

    urls.forEach((link) => {
        valid = regex.test(link);
    });

    return valid;
}, "Invalid URL.");

postSchema.path("title").validate((title) => {
    return title.length <= PostLimits.maxTitleLength;
}, `The maximum length for the title is ${PostLimits.maxTitleLength}.`);

postSchema.path("description").validate((desc) => {
    return desc.length <= PostLimits.maxDescLength;
}, `The maximum length for the description is ${PostLimits.maxDescLength}.`);

export default mongoose.model("Post", postSchema);
