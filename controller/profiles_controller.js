const Profile = require('../db/schema/profile');
const Post = require('../db/schema/post');
const Comment = require('../db/schema/comment');

const multer = require('multer');
const path = require('path');

const bcrypt = require('bcrypt');
const comment = require('../db/schema/comment');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'profile') {
            cb(null, './public/images/profile_pics/profile_pic')
        }
        else if (file.fieldname === 'background') {
            cb(null, './public/images/profile_pics/cover_pics')
        }
    },
    filename: function (req, file, cb) {
      cb(null, req.user._id + path.extname(file.originalname))
    }
});

function fileFilter (req, file, cb) {
  
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
  
}

const upload = multer({ storage: storage , fileFilter: fileFilter})

async function updateUser(req_body, req_files) {
    if (req_body.password_change.length !== 0) {
        const hashedPW = await bcrypt.hash(req_body.password_change, 10)
        await Profile.updateOne({"username": req_body.currentUser}, {$set:{"password": hashedPW}});
    }

    if (req_body.email.length !== 0) {
        await Profile.updateOne({"username": req_body.currentUser}, {$set:{"email": req_body.email}});
    }

    if (req_body.username_change.length !== 0) {
        await Profile.updateOne({"username": req_body.currentUser}, {$set:{"username": req_body.username_change}});

        await Post.updateMany({"author": req_body.currentUser}, {$set: {"author": req_body.username_change}});

        await Comment.updateMany({"commentAuthor": req_body.currentUser}, {$set: {"commentAuthor": req_body.username_change}});
    }

    if (req_files['profile']) {
        await Profile.updateOne({"username": req_body.currentUser}, {$set:{"profilePicture": '/' + req_files['profile'][0].path.split('\\').slice(1).join('/')}});
    }
    
    if (req_files['background']) {
        await Profile.updateOne({"username": req_body.currentUser}, {$set:{"backgroundPicture": '/' + req_files['background'][0].path.split('\\').slice(1).join('/')}});
    }
}

async function registerUser(req_body) {
    let result = true
    const hashedPW = await bcrypt.hash(req_body.password, 10)
    try {
        await Profile.create({
            username: req_body.username,
            password: hashedPW,
            email: req_body.email,
        });
    } catch (error) {
        result = false;
    }
    
    return result;
}

async function getProfile_username(username) {
    return await Profile.findOne({"username": username});
}

async function getProfile_id(id) {
    return await Profile.findById(id);
}

async function getProfile_email(email) {
    return await Profile.findOne({"email": email});
}

async function renderProfile(req, res) {
    const postData = await Post.find({"author": req.username});
    const profileData = await getProfile_username(req.username);
    const commentData = await Comment.find({"commentAuthor": req.username});

    try {
        const profilePic = profileData.profilePicture;
        const backgroundPic = profileData.backgroundPicture;

        res.render("profile", { user: req.user.username,
            username: req.username,
            data: postData,
            pPicPath: profilePic,
            bgPicPath: backgroundPic,
            userID: req.user._id,
            commentD: commentData});
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
}

module.exports = { renderProfile, getProfile_username, getProfile_id, getProfile_email, updateUser, registerUser, 
                    upload }