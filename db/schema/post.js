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
    text_content: {
        type: String
    },
    image_url: {
        type: String
    },
    comments: {
        comment: {
            type: String,
            
        },
        commentAuthor: {
            type: String,
        },
        commentDate: {
            type: Date,
            default: Date.now
        },
        commentUpvotes: {
            type: Number,
            default: 0
        }
    }
});

module.exports = mongoose.model('Post', PostSchema);