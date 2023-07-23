const express = require('express');
const router = express.Router();
const Profile = require('../db/schema/profile');
const Post = require('../db/schema/post');


// all the "/" and the "/<index.html" are just routing stuff
//      that need to be fixed. index.html is where the form 
//      is located for the post creation
// format for inputs is req.body.<name>
//      name is the name of the input in the html
// res.redirect sends it to the same page so that it wont
//      infinitely load
router.get("/", function(req, res) {
    res.sendFile(__dirname + "/<index.html>")
})

router.post("/", function(req, res) {
    let newProfile = new Profile ({
        username: req.body.profileUsername,
        password: req.body.profilePassword,
        email: req.body.profileEmail
    });
    newProfile.save();
    res.redirect("/");
})


//probably should split into two files

router.get("/", function(req, res) {
    res.sendFile(__dirname + "/<index.html>")
})

Profile.findByID(req.user.id, (err, user) => {
    if (err) throw new Error(err);

    let newPost = new Post ({
        title: req.body.postTitle,
        author: req.profile.username,
        caption: req.body.postCaption,
        authorID: req.profile._id
    });
    newPost.save();
    res.redirect("/");
});