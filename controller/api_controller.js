const Profile = require('../db/schema/profile');
const Post = require('../db/schema/post');

const multer = require('multer');
const path = require('path');

const bcrypt = require('bcrypt');

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
    }

    if (req_files['profile']) {
        await Profile.updateOne({"username": req_body.currentUser}, {$set:{"profilePicture": '/' + req_files['profile'][0].path.split('\\').slice(1).join('/')}});
    }
    
    if (req_files['background']) {
        await Profile.updateOne({"username": req_body.currentUser}, {$set:{"backgroundPicture": '/' + req_files['background'][0].path.split('\\').slice(1).join('/')}});
    }
}

async function upvoteFunction(req, res) {
    try {
        var action = "DISENGAGE";

        const post = await Post.findById(req.body.postID);

        var found = false;

        post.upvotes.forEach(elem => {
            if (elem.equals(req.user._id)) {
                found = true;
                return;
            }
        })

        if (!found){
            post.votes = post.votes + 1;
            await post.save();

            post.upvotes.push(req.user._id);
            post.downvotes.pull(req.user._id);
            await post.save();

            action = "ENGAGE";
        } else {
            post.votes = post.votes - 1;
            await post.save();

            post.upvotes.pull(req.user._id);
            await post.save();
        }

        console.log(post);

        return {numVotes: post.upvotes.length - post.downvotes.length,
            userAction: action}


    } catch (err) {
        console.log(err);
        return null;
    }
}

async function downvoteFunction(req, res) {
    try {
        var action = "DISENGAGE";

        const post = await Post.findById(req.body.postID);

        var found = false;

        post.downvotes.forEach(elem => {
            if (elem.equals(req.user._id)) {
                found = true;
                return;
            }
        })

        if (!found){
            post.votes = post.votes - 1;
            await post.save();

            post.downvotes.push(req.user._id);
            post.upvotes.pull(req.user._id);
            await post.save();

            action = "ENGAGE";
        } else {
            post.votes = post.votes + 1;
            await post.save();

            post.downvotes.pull(req.user._id);
            await post.save();
        }

        console.log(post)

        return {numVotes: post.upvotes.length - post.downvotes.length,
            userAction: action}
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = { updateUser, upvoteFunction, downvoteFunction, upload }