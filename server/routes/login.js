const express = require('express');
const router = express.Router();
const passport = require('passport')
const auth = require('../../controller/authenticator.js')

router.get('/register', auth.checkAlreadyAuthenticated, async (req, res) =>{
    console.log("user is registering");
    try {
        res.render('register');
    } catch (error) {
        console.log(error);
    }
});

router.get('/login', auth.checkAlreadyAuthenticated, async (req, res) =>{
    console.log("user is try to log in");
    try {
        res.render('login');
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', auth.checkAlreadyAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}))

module.exports = router;