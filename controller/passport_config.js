const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        console.log("user: " + user);
        if (user == null) {
            return done(null, false);
        }

        try {
        if (password === user.password) {
            return done(null, user);
        } else {
            return done(null, false);
        }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser( async (id, done) => {;
        return done(null, await getUserById(id))
    })
}

module.exports = initialize