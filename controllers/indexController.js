const asyncHandler = require('express-async-handler');
const db = require('../db/queries');
const { body, validationResult } = require('express-validator');
require('dotenv').config();


exports.index = asyncHandler(async (req, res) => {
    const messages = await db.getAllMessages();
    console.log(messages);

    res.render('index', { title: 'Club House', messages: messages, user: req.user })
})

exports.newMessageGet = async (req, res, next) => {
    res.render('new-message', {
        title: "New Message",
        user: req.user
    });
}

exports.newMessagePost = [
    body('title', 'The title must be between 1 and 50 characters')
        .trim()
        .isLength({ min: 1, max: 50 })
        .escape(),
    body('text', 'The message must be between 1 and 255 characters')
        .trim()
        .isLength({ min: 1, max: 255 })
        .escape(),

    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            
            const userId = req.user.id
            const { title, text } = req.body
            console.log("req.user in newMessagePost:", req.user)
            await db.createPost(userId, title, text);
            res.redirect('/');
        } catch (err) {
            return next(err);
        }
    }
]