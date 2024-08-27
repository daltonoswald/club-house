const express = require('express');
const indexController = require('../controllers/indexController');
const isSignedIn = require('../middleware').isSignedIn;
const isAdmin = require('../middleware').isAdmin;

const router = express.Router();

router.get('/', indexController.index);

router.get('/new-message', isSignedIn, indexController.newMessageGet);
router.post('/new-message', isSignedIn, indexController.newMessagePost);

router.get('/delete-message/:id', isAdmin, indexController.deleteMessageGet);
router.post('/delete-message/:id', isAdmin, indexController.deleteMessagePost);

module.exports = router;