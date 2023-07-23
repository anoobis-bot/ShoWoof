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

        // TODO Update Post authors
    }
    
    try {
        const newUserDoc = await Profile.findOne({"username": req.body.username_change});
        const newUser = newUserDoc.username;
        res.redirect("/profiles/" + newUser);
    } catch (err) {
        res.redirect("/profiles/" + req.body.currentUser);
    }
    
    

});

// router.param("username", (req, res, next, username) => {
//     req.username = username;
//     next();
// });

module.exports = router;