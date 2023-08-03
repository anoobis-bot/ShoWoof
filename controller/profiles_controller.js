const Profile = require('../db/schema/profile');
const Post = require('../db/schema/post');

async function renderProfile(req, res) {
    const postData = await Post.find({"author": req.username});
    const profileData = await Profile.findOne({"username": req.username});

    const userDoc = await Profile.findOne({"username": process.env.user});
    const userId = userDoc._id;

    try {
        const profilePic = profileData.profilePicture;
        const backgroundPic = profileData.backgroundPicture;

        res.render("profile", { user: process.env.user,
            username: req.username,
            data: postData,
            pPicPath: profilePic,
            bgPicPath: backgroundPic,
            userID: userId});
    } catch (err) {
        console.log(err);
    }
}

module.exports = { renderProfile }