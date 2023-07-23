const express = require('express');
const router = express.Router();
require('dotenv').config();

const Profile = require('../../db/schema/profile');
const Post = require('../../db/schema/post');

router.use(express.urlencoded({ extended: true }))

router.post('/edit-profile', async (req, res) => {
    console.log("current user" + req.body.currentUser);
    console.log("new user" + req.body.username);

    if (req.body.username.length !== 0) {
        await Profile.updateOne({"username": req.body.currentUser}, {$set:{"username": req.body.username}});
        process.env.user = req.body.username;
    }

    const newUserDoc = await Profile.findOne({"username": req.body.username});
    const newUser = newUserDoc.username;
    res.redirect("/profiles/" + newUser);

});

// router.param("username", (req, res, next, username) => {
//     req.username = username;
//     next();
// });

module.exports = router;