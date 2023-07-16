const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname+'/public'));

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
            profileLink: "profiles/Govna.html",
            author: "u/Govna",
            time: "12 hours ago",
            title: "The quick brown dog",
            image: "images/test_pics/posts/instadog.jpg",
            link: "post1.html"
        },
        {
            profileLink: "profiles/UWotMate.html",
            author: "u/UWotMate",
            time: "18 hours ago",
            title: "What's the best breed of dog for you?",
            description: "Mine would be the black labrador! They're so cute and very intelligent.",
            link: "post2.html"
        },
        // Add more post objects as needed
    ];

    res.render("index", { topPostsText, posts });
});

app.listen(3000);