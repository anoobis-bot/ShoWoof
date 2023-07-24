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
    
    try {
        const newUserDoc = await Profile.findOne({"username": req.body.username_change});
        const newUser = newUserDoc.username;
        res.redirect("/profiles/" + newUser);
    } catch (err) {
        res.redirect("/profiles/" + req.body.currentUser);
    }
    

});

module.exports = router;