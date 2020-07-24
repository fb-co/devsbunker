import Languages from '../languages/languages.list';
const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
};

const bunkerSchema = new mongoose.Schema({
    language: requiredString,
    sections: {
        type: String
    },

}, {
    timestamps: true
});

bunkerSchema.path('language').validate((language) => {
    return Languages.includes(language)
}, 'Invalid Language tag.');



module.exports = mongoose.model('Bunker', bunkerSchema);