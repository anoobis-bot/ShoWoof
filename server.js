const express = require("express");
const app = express();

const connectDB = require("./db/config/db");
const { post } = require("./routes/profiles");
const db = connectDB();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


app.get("/post/:postId", (req, res) => {
     // Assuming you have a posts array with the individual post data
    // Replace 'posts' below with your actual data source
    
    // const post = posts.find(post => post.link === req.params.postId);

    // if (!post) {
    //     // Handle the case when the post is not found (e.g., show a 404 page)
    //     return res.status(404).render("notfound", { user: process.env.user });
    // }
    const comments = [
        {
            commenter: 'DoggoExpert',
            commentDate: '1 hour ago',
            commentText: "That's not brown?!1!"
        }
        // Add more comments here...
    ];

    res.render("post", {
        pageTitle: "The Quick Brown Dog",
        numberOfVotes: 5,
        postAuthor: "u/Govna",
        postDate: "12 hours ago",
        postCaption: "The Quick Brown Dog",
        postImageSrc: "/images/test_pics/posts/instadog.jpg",
        commentUsername: "u/DogsDBest",
        comments: comments, // Pass the 'comments' array to the template
        user: process.env.user
    });
});

const profilesRoutes = require('./routes/profiles');
app.use('/profiles', profilesRoutes);

const mainRoute = require('./routes/main');
app.use('/', mainRoute);

app.listen(3000);