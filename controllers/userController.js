const asyncHandler = require('express-async-handler');
const db = require('../db/queries');
const session = require('express-session');
const bcryptjs = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.findUserByUsername(username);

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            const match = await bcryptjs.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password"})
            }
            // if (user.password !== password) {
            //     return done(null, false, { message: "Incorrect password" });
            // }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.deserializeUser(id);

        done(null, user);
    } catch (err) {
        done(err);
    }
})

exports.userLogInGet = async (req, res, next) => {
    try {
        const message = req.session.messages || [];
        // req.session.messages = [];

        res.render('log-in', {
            title: "Log in",
            message: message[0],
            user: req.user,
        });
    } catch (err) {
        console.log(err);
    }
}

exports.userLogInPost = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: "/users/log-in",
    failureMessage: true,
});

exports.userLogout = async(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    })
}

exports.userSignUpGet = async (req, res, next) => {
    try {
        const message = req.session.messages || [];
        // req.session.messages = [];

        res.render('sign-up', {
            title: "Sign up",
            message: message[0],
            user: req.user,
        });
    } catch (err) {
        console.log(err);
    }
}

exports.userSignUpPost = [
    body("first_name", "First Name must not be empty.")
        .trim()
        .isLength({ min: 1, max: 25 })
        .escape(),
    body("last_name", "Last Name must not be empty.")
        .trim()
        .isLength({ min: 1, max: 25 })
        .escape(),
    body("username", "Username must not be empty.")
        .trim()
        .isLength({ min: 1, max: 25 })
        .escape(),
    body("password", "Password must not be empty.")
        .trim()
        .isLength({ min: 1, max: 255 })
        .escape(),
    body("confirm_password", "The passwords must match")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                return false
            }
            return true
        }),

    async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.render("sign-up", {
                    title: "Sign up",
                    errors: errors.array()
                });
                return
            } else {
                const usernameTaken = await db.findUserByUsername(req.body.username);
                if (usernameTaken) {
                    res.render('sign-up', {
                        title: "Sign up",
                        errors: [{ msg: "The username is already in use."}],
                        message: "The username is already in use",
                    })
                }
            }

            const { first_name, last_name, username, password } = req.body

                try {
                    await db.createUser(first_name, last_name, username, password);
                    res.redirect('/');
                } catch (err) {
                    return next(err);
                }
        }
]

exports.userJoinClubGet = (req, res, next) => {
    if (req.user.ismember) {
        res.redirect('/')
    } else {
        res.render("join-club", {
            title: "Join the Club",
            user: req.user
        })
    }
}

exports.userJoinClubPost = async (req, res, next) => {
    const userPasscode = req.body.passcode;
    const userId = req.user.id
    try {
        if ( userPasscode === process.env.PASSCODE || PASSCODE ) {
            await db.joinClub(userId);
            res.redirect('/');
        } else {
            res.render('join-club', {
                title: "Join the Club",
                user: req.user,
                error: true,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

exports.userBecomeAdminGet = (req, res, next) => {
    if (req.user.isadmin) {
        res.redirect('/')
    } else {
        res.render('become-admin', {
            title: "Become an Admin", 
                user: req.user
        })
    }
};

exports.userBecomeAdminPost = async (req, res, next) => {
    const adminPasscode = req.body.adminCode;
    const userId = req.user.id
    try {
        if ( adminPasscode === process.env.ADMINCODE || ADMINCODE ) {
            await db.becomeAdmin(userId);
            res.redirect('/')
        } else {
            res.render('become-admin', {
                title: "Become an Admin",
                user: req.user,
                error: true,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

exports.userProfileGet = async (req, res, next) => {
    // const userId = req.user.id;
    const userId = req.params.userid;
    const messages = await db.getAllMessagesFromUser(userId);
    res.render('user-profile', {
        title: `${messages[0].username}'s Profile`,
        user: req.user,
        messages: messages
    })
}