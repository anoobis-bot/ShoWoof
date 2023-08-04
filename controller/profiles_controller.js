const Profile = require('../db/schema/profile');
const Post = require('../db/schema/post');

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

    const userDoc = await getProfile_username(process.env.user);
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

module.exports = { renderProfile, getProfile_username, getProfile_id, getProfile_email }