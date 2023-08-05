const express = require('express');
const router = express.Router();
const Post = require('../../db/schema/post');
const Profile = require("../../db/schema/profile")
require('dotenv').config()

router.get('/:postId', async (req, res) => {

    try {
        let slug = req.params.postId;
        const data = await Post.findById({_id: slug});

        res.render('post', {data, currentRoute:`/post/${slug}`, user: req.user.username, userID: req.user._id});
    } catch (error) {
        console.log(error);
    }
    
});

module.exports = router;