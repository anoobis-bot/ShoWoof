const express = require('express');
const router = express.Router();
const Profile = require('../db/schema/profile');
const Post = require('../db/schema/post');

router.get('', async (req, res) =>{
    console.log("Server is running");
    try {
        const data = await Post.find();
        
        const userDoc = await Profile.findOne({"username": process.env.user});
        const userId = userDoc._id;

        const topPosts = await Post.find().sort({"votes": -1}).limit(4);

        res.render('index', {data, user: process.env.user, userID: userId,
                    topPosts});
    } catch (error) {
        console.log(error);
    }
});

router.get('/register', async (req, res) =>{
    console.log("user is registering");
    try {
        res.render('register');
    } catch (error) {
        console.log(error);
    }
});

router.get('/login', async (req, res) =>{
    console.log("user is try to log in");
    try {
        res.render('login');
    } catch (error) {
        console.log(error);
    }
});

router.get('/newPost', async (req, res) =>{
    console.log("user is making a new post");
    try {
        res.render('new_post', {user: process.env.user});
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
                author: process.env.user,
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

router.get('/editPost/:id', async (req, res) => {
    try {

        const data = await Post.findOne({ _id: req.params.id });

        res.render('edit_post', {data, user: process.env.user})
        

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
            author: process.env.user,
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

    res.render("index", { data, currentRoute: '/', user: process.env.user });

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
            commentAuthor: process.env.user
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
        };

        const post = await Post.findById(postId);

        // Find the comment with the specified commentId in the post's comments array
        const comment = post.Comments.id(commentId);

        // Update the comment properties with the new values from updatedComment
        comment.comment = updatedComment.comment;
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
            commentAuthor: process.env.user
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


//   router.post('/posts/:postId/comments', async (req, res) => {
//     try {
//       const postId = req.params.postId;
//       const { comment, parentCommentId } = req.body; // Assuming you have a field named 'parentCommentId' in the request body.
  
//       if (!parentCommentId) {
//         // This is a top-level comment
//         const newComment = new Comment({
//           comment: comment,
//           commentAuthor: process.env.user,
//         });
  
//         const post = await Post.findById(postId);
  
//         if (!post.Comments || !Array.isArray(post.Comments)) {
//           post.Comments = [];
//         }
  
//         post.Comments.push(newComment);
//         await post.save();
//       } else {
//         // This is a reply to an existing comment
//         const parentComment = await Comment.findById(parentCommentId);
  
//         if (!parentComment) {
//           return res.status(404).json({ message: 'Parent comment not found.' });
//         }
  
//         const newReply = new Comment({
//           comment: comment,
//           commentAuthor: process.env.user,
//           parentComment: parentCommentId,
//         });
  
//         await newReply.save();
//         parentComment.Comments.push(newReply);
//         await parentComment.save();
//       }
  
//       res.redirect(`/posts/${postId}`);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Error adding comment.' });
//     }
//   });

module.exports = router;

    // // Define the data required for rendering the dynamic parts of the page
    // const topPostsText = [
    //     "Look at our newest addition in our family!",
    //     "We finally got a professional photograph!",
    //     "Quality time at the lake ^_^",
    //     "Majestic."
    // ];

    // const posts = [
    //     {
    //         profileLink: "profiles/Govna",
    //         author: "Govna",
    //         time: "12 hours ago",
    //         title: "The quick brown dog",
    //         image: "images/test_pics/posts/instadog.jpg",
    //         link: "/post/post0"
    //     },
    //     {
    //         profileLink: "profiles/UWotMate",
    //         author: "UWotMate",
    //         time: "18 hours ago",
    //         title: "What's the best breed of dog for you?",
    //         description: "Mine would be the black labrador! They're so cute and very intelligent.",
    //         link: "post2.html"
    //     },
    //     {
    //         profileLink: "profiles/Dogsmith",
    //         author: "Dogsmith",
    //         time: "18 hours ago",
    //         title: "Hard work with my dog",
    //         image: "images/test_pics/posts/smith-dog.jpg",
    //         link: "post3.html"
    //     },
    //     {
    //         profileLink: "profiles/Zoominator",
    //         author: "Zoominator",
    //         time: "1 day ago",
    //         title: "My dog got the zoomies!",
    //         image: "images/test_pics/posts/zoomies.jpg",
    //         link: "post4.html"
    //     },
    //     {
    //         profileLink: "profiles/DogsDBest",
    //         author: "DogsDBest",
    //         time: "1 day ago",
    //         title: "Face of my pit before i feed him",
    //         image: "images/test_pics/posts/smiling-pit.jpg_large",
    //         link: "post5.html"
    //     }
    //     // Add more post objects as needed
    // ];

    // res.render("index", { topPostsText, posts, user: process.env.user });


// function insertProfileData () {
//       Profile.insertMany([
//         {
//             username: "CrazyCat23",
//             password: "P@ssw0rd!1",
//             email: "crazycat23@example.com"
//         },
//         {
//             username: "AdventureSeeker",
//             password: "Mountain@Hiker42",
//             email: "seektheadventure@example.com"
//         },        
//         {
//             username: "TechGuru789",
//             password: "Innovate&Learn",
//             email: "techguru789@example.com"
//         },        
//         {
//             username: "GardenEnthusiast",
//             password: "GreenThumb2023",
//             email: "gardenlover@example.com"
//         },        
//         {
//             username: "MusicLover22",
//             password: "Melody&Harmony",
//             email: "musiclover22@example.com"
//         },        
//       ])
//     }
    
    // insertProfileData();

// function insertPostData () {
//       Post.insertMany([
//         {
//             "title": "The quick brown dog",
//             "author": "Govna",
//             "image_url": "https://i.imgur.com/gusOP6M.jpg",
//             "text_content": ""
//         },
//         {
//             "title": "What's the best breed of dog for you?",
//             "author": "UWotMate",
//             "image_url": "",
//             "text_content": "Mine would be the black labrador! They're so cute and very intelligent."
//         },        
//         {
//             "title": "Hard work with my dog",
//             "author": "Dogsmith",
//             "image_url": "https://i.imgur.com/viIDKGL.jpg",
//             "text_content": ""
//         },        
//         {
//             "title": "My dog got the zoomies!",
//             "author": "Zoomies",
//             "image_url": "https://i.imgur.com/ozuu9QT.jpg",
//             "text_content": ""
//         },        
//         {
//             "title": "Face of my pit before I feed him",
//             "author": "dogAREthebest",
//             "image_url": "https://worldofdogz.com/wp-content/uploads/2022/04/Why-Wont-My-Pitbull-Eat.jpg.webp",
//             "text_content": ""
//         },
//         {
//             "title": "Look at this cutie <3",
//             "author": "dogAREthebest",
//             "image_url": "https://img.rawpixel.com/private/static/images/website/2022-05/ns8230-image.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=b3961e17298745c0868eeef46211c3d0",
//             "text_content": ""
//         }  
//       ])
//     }
// insertPostData();
