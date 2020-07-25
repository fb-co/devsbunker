import Languages from '../languages/languages.list';
const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
};

const postSchema = new mongoose.Schema({
    author: requiredString,
    title: requiredString,
    description: {
        type: String
    },
    thumbnail: { // [!] check notes [!]
        type: String
    },
    githubLink: {
        type: String,
    },
    otherLink: {
        type: String
    },
    bunkerTag: requiredString,
    clip: {
        type: String // [!] check notes [!]
    }
}, {
    timestamps: true
});


// validating fields
postSchema.path('githubLink').validate((url) => {
    const regex = /http(s)?:\/\/github.com/;
    return regex.test(url);
}, 'Invalid GitHub URL.');

postSchema.path('otherLink').validate((url) => {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return regex.test(url);
}, 'Invalid URL.');

postSchema.path('bunkerTag').validate((bunker) => {
    return Languages.includes(bunker)
}, 'Invalid Bunker tag.');



module.exports = mongoose.model('Post', postSchema);


/*

NOTES:
since I don't know how we will handle file uploads I thought of
storing the path fot the uploaded file in the db and so store the
file in the HDD.

Since files will be, hopefully, less than 16mb we could store
them directly to the db w/o needing Gridfs

*/