const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    dateJoined: {
        type: Date,
        default: Date.now
    },
    profilePicture: {
        type: String
    },
    backgroundPicture: {
        type: String
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);