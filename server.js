const express = require("express");
const app = express();

const connectDB = require("./db/config/db");
const { post } = require("./server/routes/profiles");
const db = connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

const postsRoutes = require('./server/routes/posts');
app.use('/posts', postsRoutes);

const profilesRoutes = require('./server/routes/profiles');
app.use('/profiles', profilesRoutes);

const mainRoute = require('./server/main');
app.use('/', mainRoute);

const apiRoutes = require('./server/routes/api');
app.use('/api', apiRoutes);

app.listen(3000);