const Profile = require('../db/schema/profile');
const Post = require('../db/schema/post');

async function updateUser(req_body) {
    if (req_body.password_change.length !== 0) {
        await Profile.updateOne({"username": req_body.currentUser}, {$set:{"password": req.body.password_change}});
    }

    if (req_body.email.length !== 0) {
        await Profile.updateOne({"username": req_body.currentUser}, {$set:{"email": req_body.email}});
    }

    if (req_body.username_change.length !== 0) {
        await Profile.updateOne({"username": req_body.currentUser}, {$set:{"username": req_body.username_change}});
        process.env.user = req_body.username_change;

        await Post.updateMany({"author": req_body.currentUser}, {$set: {"author": req_body.username_change}});
    }

    if (req_body.profile.length !== 0) {
        await Profile.updateOne({"username": req_body.currentUser}, {$set:{"profilePicture": req_body.profile}});
    }
    
    if (req_body.background.length !== 0) {
        await Profile.updateOne({"username": req_body.currentUser}, {$set:{"backgroundPicture": req_body.background}});
    }
}

async function upvoteFunction(req, res) {
    try {
        var action = "DISENGAGE";

        const userDoc = await Profile.findOne({"username": process.env.user});
        const userID = userDoc._id;

        const post = await Post.findById(req.body.postID);

        var found = false;

        post.upvotes.forEach(elem => {
            if (elem.equals(userID)) {
                found = true;
                return;
            }
        })

        if (!found){
            post.votes = post.votes + 1;
            await post.save();

            post.upvotes.push(userID);
            post.downvotes.pull(userID);
            await post.save();

            action = "ENGAGE";
        } else {
            post.votes = post.votes - 1;
            await post.save();

            post.upvotes.pull(userID);
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

        const userDoc = await Profile.findOne({"username": process.env.user});
        const userID = userDoc._id;

        const post = await Post.findById(req.body.postID);

        var found = false;

        post.downvotes.forEach(elem => {
            if (elem.equals(userID)) {
                found = true;
                return;
            }
        })

        if (!found){
            post.votes = post.votes - 1;
            await post.save();

            post.downvotes.push(userID);
            post.upvotes.pull(userID);
            await post.save();

            action = "ENGAGE";
        } else {
            post.votes = post.votes + 1;
            await post.save();

            post.downvotes.pull(userID);
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

module.exports = { updateUser, upvoteFunction, downvoteFunction }