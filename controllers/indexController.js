const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

exports.index = asyncHandler(async (req, res) => {
    const messages = await db.getAllMessages();

    res.render('index', { title: 'Club House', messages: messages })
})