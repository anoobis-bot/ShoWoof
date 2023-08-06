const Profile = require('../db/schema/profile');
const Post = require('../db/schema/post');

async function upvoteFunction(req, res) {
    try {
        var action = "DISENGAGE";

        const post = await Post.findById(req.body.postID);

        var found = false;

        post.upvotes.forEach(elem => {
            if (elem.equals(req.user._id)) {
                found = true;
                return;
            }
        })

        if (!found){
            post.votes = post.votes + 1;
            await post.save();

            post.upvotes.push(req.user._id);
            post.downvotes.pull(req.user._id);
            await post.save();

            action = "ENGAGE";
        } else {
            post.votes = post.votes - 1;
            await post.save();

            post.upvotes.pull(req.user._id);
            await post.save();
        }

        console.log(post);

        return {numVotes: post.upvotes.length - post.downvotes.length,
            userAction: action}


    } catch (err) {
        console.log(err);
        return null;
    }
}

async function downvoteFunction(req, res) {
    try {
        var action = "DISENGAGE";

        const post = await Post.findById(req.body.postID);

        var found = false;

        post.downvotes.forEach(elem => {
            if (elem.equals(req.user._id)) {
                found = true;
                return;
            }
        })

        if (!found){
            post.votes = post.votes - 1;
            await post.save();

            post.downvotes.push(req.user._id);
            post.upvotes.pull(req.user._id);
            await post.save();

            action = "ENGAGE";
        } else {
            post.votes = post.votes + 1;
            await post.save();

            post.downvotes.pull(req.user._id);
            await post.save();
        }

        console.log(post)

        return {numVotes: post.upvotes.length - post.downvotes.length,
            userAction: action}
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = { upvoteFunction, downvoteFunction }