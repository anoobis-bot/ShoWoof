const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    console.log("Server is running");

    // Define the data required for rendering the dynamic parts of the page
    const topPostsText = [
        "Look at our newest addition in our family!",
        "We finally got a professional photograph!",
        "Quality time at the lake ^_^",
        "Majestic."
    ];

    const posts = [
        {
            profileLink: "profiles/Govna",
            author: "Govna",
            time: "12 hours ago",
            title: "The quick brown dog",
            image: "images/test_pics/posts/instadog.jpg",
            link: "post1.html"
        },
        {
            profileLink: "profiles/UWotMate",
            author: "UWotMate",
            time: "18 hours ago",
            title: "What's the best breed of dog for you?",
            description: "Mine would be the black labrador! They're so cute and very intelligent.",
            link: "post2.html"
        },
        {
            profileLink: "profiles/Dogsmith",
            author: "Dogsmith",
            time: "18 hours ago",
            title: "Hard work with my dog",
            image: "images/test_pics/posts/smith-dog.jpg",
            link: "post3.html"
        },
        {
            profileLink: "profiles/Zoominator",
            author: "Zoominator",
            time: "1 day ago",
            title: "My dog got the zoomies!",
            image: "images/test_pics/posts/zoomies.jpg",
            link: "post4.html"
        },
        {
            profileLink: "profiles/DogsDBest",
            author: "DogsDBest",
            time: "1 day ago",
            title: "Face of my pit before i feed him",
            image: "images/test_pics/posts/smiling-pit.jpg_large",
            link: "post5.html"
        }
        // Add more post objects as needed
    ];

    res.render("index", { topPostsText, posts });
});

const profilesRoutes = require('./routes/profiles');
app.use('/profiles', profilesRoutes)

app.listen(3000);