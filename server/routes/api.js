const express = require('express');
const router = express.Router();
require('dotenv').config();

const Profile = require('../../db/schema/profile');

const api = require('../../controller/api_controller.js')

router.use(express.urlencoded({ extended: true }))

router.post('/edit-profile', async (req, res) => {
    console.log("current user" + req.body.currentUser);
    console.log("new user" + req.body.username_change);
    
    await api.updateUser(req.body);

    try {
        const newUserDoc = await Profile.findOne({"username": req.body.username_change});
        const newUser = newUserDoc.username;
        res.redirect("/profiles/" + newUser);
    } catch (err) {
        res.redirect("/profiles/" + req.body.currentUser);
    }

});

router.post("/upvote", async (req, res) => {
    const result = await api.upvoteFunction(req, res);

    if (result !== null) {
        res.send(result)
    }
});

router.post("/downvote", async (req, res) => {
    const result = await api.downvoteFunction(req,res);

    if (result !== null) {
        res.send(result)
    }
});

module.exports = router;