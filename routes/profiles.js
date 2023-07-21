const express = require('express');
const router = express.Router();
require('dotenv').config()

router.get('/:username', (req, res) => {
    res.render("profile", { user: process.env.user,
                            username: req.username });
});

router.get('/:username/edit', (req, res) => {
    res.render("edit_profile", { user: process.env.user })
});

router.param("username", (req, res, next, username) => {
    req.username = username;
    next();
});

module.exports = router;