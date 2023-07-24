const express = require('express');
const router = express.Router();
require('dotenv').config();

const Profile = require('../../db/schema/profile');
const Post = require('../../db/schema/post');

router.use(express.urlencoded({ extended: true }))

router.post('/edit-profile', async (req, res) => {
    console.log("current user" + req.body.currentUser);
    console.log("new user" + req.body.username_change);

    if (req.body.password_change.length !== 0) {
        await Profile.updateOne({"username": req.body.currentUser}, {$set:{"password": req.body.password_change}});
    }

    if (req.body.email.length !== 0) {
        await Profile.updateOne({"username": req.body.currentUser}, {$set:{"email": req.body.email}});
    }

    if (req.body.username_change.length !== 0) {
        await Profile.updateOne({"username": req.body.currentUser}, {$set:{"username": req.body.username_change}});
        process.env.user = req.body.username_change;

        await Post.updateMany({"author": req.body.currentUser}, {$set: {"author": req.body.username_change}});
    }

    if (req.body.profile.length !== 0) {
        await Profile.updateOne({"username": req.body.currentUser}, {$set:{"profilePicture": req.body.profile}});
    }
    
    if (req.body.background.length !== 0) {
        await Profile.updateOne({"username": req.body.currentUser}, {$set:{"backgroundPicture": req.body.background}});
    }

    try {
        const newUserDoc = await Profile.findOne({"username": req.body.username_change});
        const newUser = newUserDoc.username;
        res.redirect("/profiles/" + newUser);
    } catch (err) {
        res.redirect("/profiles/" + req.body.currentUser);
    }
    

});

router.post("/upvote", async (req, res) => {
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

        

        // compute for votes
        res.send({numVotes: post.upvotes.length - post.downvotes.length,
                    userAction: action});

        console.log(post);
    } catch (err) {
        console.log(err);
    }
});

router.post("/downvote", async (req, res) => {
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

        res.send({numVotes: post.upvotes.length - post.downvotes.length,
            userAction: action});

        console.log(post)
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;