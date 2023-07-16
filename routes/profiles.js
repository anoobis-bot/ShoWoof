const express = require('express');
const router = express.Router();

router.get('/:username', (req, res) => {
    // TODO fix the ejs file here
    res.render(`profiles/${req.username}`);
});

router.param("username", (req, res, next, username) => {
    req.username = username;
    next();
});

module.exports = router;