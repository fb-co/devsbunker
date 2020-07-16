const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9_-]+$/, 'is invalid'],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    password: requiredString,

    tag: {
        type: String,
        default: "Member"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);