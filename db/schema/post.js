const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const profile = require('./profile');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        required: true
    }, 
    datePosted: {
        type: Date,
        default: Date.now
    },
    caption: {
        type: String,
        required: true
    },
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: profile
    }
});

module.exports = mongoose.model('Post', PostSchema);