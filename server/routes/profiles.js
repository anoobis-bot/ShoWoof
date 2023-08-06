const express = require('express');
const router = express.Router();
require('dotenv').config()

const api = require('../../controller/profiles_controller.js')

const Profile = require('../../db/schema/profile');

router.get('/:username', async (req, res) => {
    await api.renderProfile(req, res);
});

router.get('/:username/edit', (req, res) => {
    res.render("edit_profile", { user: req.user })
});

router.post('/edit-profile', api.upload.fields([{name: 'profile', maxCount: 1}, {name: 'background', maxCount: 1}]), 
    async (req, res) => {
        console.log("current user" + req.body.currentUser);
        console.log("new user" + req.body.username_change);
        
        await api.updateUser(req.body, req.files);

        try {
            const newUserDoc = await Profile.findOne({"username": req.body.username_change});
            const newUser = newUserDoc.username;
            res.redirect("/profiles/" + newUser);
        } catch (err) {
            res.redirect("/profiles/" + req.body.currentUser);
        }

});

router.param("username", (req, res, next, username) => {
    req.username = username;
    next();
});

module.exports = router;