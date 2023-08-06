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

router.post('/register', async (req, res) => {
    
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
    failureRedirect: '/login',
    failureFlash: true,
}),
    (req, res) => {
        if (req.body.remember) {
            const days = 21
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * days
        }

        res.redirect('/');
    }
);

router.delete('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

module.exports = router;