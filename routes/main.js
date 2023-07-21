const express = require('express');
const router = express.Router();
const Profile = require('../db/schema/profile');
const Post = require('../db/schema/post');



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
    
//     insertProfileData();

function insertPostData () {
      Post.insertMany([
        {
            "title": "The Enchanted Forest",
            "author": "Emily Johnson",
            "caption": "Exploring the magical woods on a misty morning. #naturelovers"
        },
        {
            "title": "Beyond the Stars",
            "author": "Alex Turner",
            "caption": "Lost in the beauty of the night sky. #stargazing"
        },        
        {
            "title": "A Journey Through Time",
            "author": "Sarah Thompson",
            "caption": "Uncovering the mysteries of history, one artifact at a time. #archaeology"
        },        
        {
            "title": "The Culinary Adventures",
            "author": "Michael Lee",
            "caption": "Savoring the flavors from around the world. #foodie"
        },        
        {
            "title": "Infinite Imagination",
            "author": "Jessica Williams",
            "caption": "Diving into the world of fantasy with every book. #booklover"
        }        
      ])
    }
    
    insertPostData();

    module.exports = router;