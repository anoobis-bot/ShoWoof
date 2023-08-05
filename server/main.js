const express = require('express');
const router = express.Router();
const Profile = require('../db/schema/profile');
const Post = require('../db/schema/post');
const auth = require('../controller/authenticator.js');

router.get('', auth.checkAuthenticated, async (req, res) =>{
    console.log("Server is running");
    try {
        const data = await Post.find().sort({"datePosted": -1});

        const topPosts = await Post.find().sort({"votes": -1}).limit(4);

        res.render('index', {data, user: req.user.username, userID: req.user._id,
                    topPosts});
    } catch (error) {
        console.log(error);
    }
});

router.get('/newPost', auth.checkAuthenticated, async (req, res) =>{
    console.log("user is making a new post");
    try {
        res.render('new_post', {user: req.user.username});
    } catch (error) {
        console.log(error);
    }
});

/*
POST
*/

router.post('/newPost', async (req, res) => {
    try {

        try {
            const newPost = new Post({
                title: req.body.caption,
                text_content: req.body.text_content,
                image_url: req.body.image_url,
                author: req.user.username,
            });

            await Post.create(newPost);
            res.redirect('/');
            
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
});

/*
GET
*/

router.get('/editPost/:id', auth.checkAuthenticated, async (req, res) => {
    try {

        const data = await Post.findOne({ _id: req.params.id });

        res.render('edit_post', {data, user: req.user.username})
        

    } catch (error) {
        console.log(error)
    }
});

/*
PUT
*/

router.put('/editPost/:id', async (req, res) => {
    try {

        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.caption,
            text_content: req.body.text_content,
            image_url: req.body.image_url,
            author: req.user.username,
            postEdit: true,
            datePosted: new Date()
        });
        
        res.redirect(`/posts/${req.params.id}`);


    } catch (error) {
        console.log(error)
    }
});

/*
DELETE

*/

router.delete('/deletePost/:id', async (req, res) => {
    try {

        await Post.deleteOne( { _id: req.params.id } );
        res.redirect('/');

    } catch (error) {
        console.log(error)
    }
});



router.post('', async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                { caption: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                { author: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
            ]
        });

    res.render("index", { data, currentRoute: '/', user: req.user.username });

    } catch (error) {
        console.log(error)
    }
})

router.post('/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        if (req.body.comTerm != "" ) {
            
            const newComment = {
            comment: req.body.comTerm,
            commentAuthor: req.user.username
        };

        const post = await Post.findById(postId);

        if (!post.Comments || !Array.isArray(post.Comments)) {
            post.Comments = [];
        }

        post.Comments.push(newComment);
        await post.save();
        
        }
        res.redirect(`/posts/${postId}`);

    } catch (error) {
        console.log(error);
    }
});

router.post('/posts/:postId/comments/:commentId/edit', async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const updatedComment = {
            comment: req.body.editTerm,
            commentEdit: true,
            commentDate: new Date()
        };

        const post = await Post.findById(postId);

        // Find the comment with the specified commentId in the post's comments array
        const comment = post.Comments.id(commentId);

        // Update the comment properties with the new values from updatedComment
        comment.comment = updatedComment.comment;
        comment.commentEdit = updatedComment.commentEdit;
        comment.commentDate = updatedComment.commentDate;
        // Update other properties as needed

        await post.save();
        res.redirect(`/posts/${postId}`);
    } catch (error) {
        console.log(error);
    }
});

router.post('/posts/:postId/comments/:commentId/delete', async (req, res) => {
    try {
      const postId = req.params.postId;
      const commentIdToDelete = req.params.commentId;
      const post = await Post.findById(postId);
      post.Comments = post.Comments.filter(comment => comment._id.toString() !== commentIdToDelete);
      await post.save();
  
      res.redirect(`/posts/${postId}`);
    } catch (error) {
      console.log('Error deleting comment:', error);
    }
  });

  router.post('/posts/:postId/comments/:commentId/reply', async (req, res) => {
    try {
        const postId = req.params.postId;
        if (req.body.replyTerm != "" ) {
            
            const newComment = {
            comment: req.body.replyTerm,
            commentAuthor: req.user.username
        };

        const post = await Post.findById(postId);

        post.Comments.push(newComment);
        await post.save();
        
        }
        res.redirect(`/posts/${postId}`);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error adding reply comment.');
    }
}); 

module.exports = router;