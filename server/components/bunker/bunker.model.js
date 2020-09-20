import Languages from "../languages/languages.list.js";
import mongoose from "mongoose";

const requiredString = {
    type: String,
    required: true,
};

const bunkerSchema = new mongoose.Schema(
    {
        language: requiredString,
        sections: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

bunkerSchema.path("language").validate((language) => {
    return Languages.includes(language);
}, "Invalid Language tag.");

export default mongoose.model("Bunker", bunkerSchema);
