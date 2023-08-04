const express = require('express');
const router = express.Router();
require('dotenv').config()

const api = require('../../controller/profiles_controller.js')

router.get('/:username', async (req, res) => {
    await api.renderProfile(req, res);
});

router.get('/:username/edit', (req, res) => {
    res.render("edit_profile", { user: req.user })
});

router.param("username", (req, res, next, username) => {
    req.username = username;
    next();
});

module.exports = router;