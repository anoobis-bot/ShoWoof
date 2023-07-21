const express = require('express');
const router = express.Router();
const Profile = require('../db/schema/profile');



// function insertPostData () {
//       Profile.insertMany([
//         {
//             "username": "CrazyCat23",
//             "password": "P@ssw0rd!1",
//             "email": "crazycat23@example.com"
//         },
//         {
//             "username": "AdventureSeeker",
//             "password": "Mountain@Hiker42",
//             "email": "seektheadventure@example.com"
//         },        
//         {
//             "username": "TechGuru789",
//             "password": "Innovate&Learn",
//             "email": "techguru789@example.com"
//         },        
//         {
//             "username": "GardenEnthusiast",
//             "password": "GreenThumb2023",
//             "email": "gardenlover@example.com"
//         },        
//         {
//             "username": "MusicLover22",
//             "password": "Melody&Harmony",
//             "email": "musiclover22@example.com"
//         },        
//       ])
//     }
    
//     insertPostData();

    module.exports = router;