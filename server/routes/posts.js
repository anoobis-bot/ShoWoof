const express = require('express');
const router = express.Router();
const Post = require('../../db/schema/post');
require('dotenv').config()

router.get('/:postId', async (req, res) => {

    try {
        let slug = req.params.postId;
        const data = await Post.findById({_id: slug});
        res.render('post', {data, currentRoute:`/post/${slug}`, user: process.env.user});
    } catch (error) {
        console.log(error);
    }

    // Assuming you have a posts array with the individual post data
   // Replace 'posts' below with your actual data source

//    try {
//     let slug = req.params.id;

//     const data = await Post.findById({_id: slug});

//     res.render('post', {data, currentRoute:`/post/${slug}` /* user: process.env.user*/});
//     } catch (error) {
//         console.log(error);
//     }

//    const post = posts.find(post => post.link === req.params.postId);

//    if (!post) {
//        // Handle the case when the post is not found (e.g., show a 404 page)
//        return res.status(404).render("notfound", { user: process.env.user });
//    }
//    const comments = [
//        {
//            commenter: 'DoggoExpert',
//            commentDate: '1 hour ago',
//            commentText: "That's not brown?!1!"
//        }
//        // Add more comments here...
//    ];

//    res.render("post", {
//        pageTitle: "The Quick Brown Dog",
//        numberOfVotes: 5,
//        postAuthor: "u/Govna",
//        postDate: "12 hours ago",
//        postCaption: "The Quick Brown Dog",
//        postImageSrc: "/images/test_pics/posts/instadog.jpg",
//        commentUsername: "u/DogsDBest",
//        comments: comments, // Pass the 'comments' array to the template
//        user: process.env.user
//    });
});

module.exports = router;