const mongoose = require('mongoose');
const commentSchema = require('./comment')

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
    upvotes: {
        type: [Schema.Types.ObjectId],
        required: false
    },
    downvotes: {
        type: [Schema.Types.ObjectId],
        required: false
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
    postEdit: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Post', PostSchema);