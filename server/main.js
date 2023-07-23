const express = require('express');
const router = express.Router();
const Profile = require('../db/schema/profile');
const Post = require('../db/schema/post');

router.get('', async (req, res) =>{
    console.log("Server is running");
    try {
        const data = await Post.find();
        res.render('index', {data, user: process.env.user});
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
//             "title": "The Enchanted Forest",
//             "author": "Emily Johnson",
//             "caption": "Exploring the magical woods on a misty morning. #naturelovers"
//         },
//         {
//             "title": "Beyond the Stars",
//             "author": "Alex Turner",
//             "caption": "Lost in the beauty of the night sky. #stargazing"
//         },        
//         {
//             "title": "A Journey Through Time",
//             "author": "Sarah Thompson",
//             "caption": "Uncovering the mysteries of history, one artifact at a time. #archaeology"
//         },        
//         {
//             "title": "The Culinary Adventures",
//             "author": "Michael Lee",
//             "caption": "Savoring the flavors from around the world. #foodie"
//         },        
//         {
//             "title": "Infinite Imagination",
//             "author": "Jessica Williams",
//             "caption": "Diving into the world of fantasy with every book. #booklover"
//         }        
//       ])
//     }
    
//     insertPostData();