const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    commentPostId: {
        type: Schema.Types.ObjectId
    },
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
    },
    commentEdit: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Comment', CommentSchema);