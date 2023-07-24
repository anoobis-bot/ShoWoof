const express = require('express');
const router = express.Router();
require('dotenv').config()

const Profile = require('../../db/schema/profile');
const Post = require('../../db/schema/post');

router.get('/:username', async (req, res) => {
    const postData = await Post.find({"author": req.username});
    const profileData = await Profile.findOne({"username": req.username});

    try {
        const profilePic = profileData.profilePicture;
        const backgroundPic = profileData.backgroundPicture;

        res.render("profile", { user: process.env.user,
            username: req.username,
            data: postData,
            pPicPath: profilePic,
            bgPicPath: backgroundPic});
    } catch (err) {
        console.log(err);
    }
});

router.get('/:username/edit', (req, res) => {
    res.render("edit_profile", { user: process.env.user })
});

router.param("username", (req, res, next, username) => {
    req.username = username;
    next();
});

module.exports = router;