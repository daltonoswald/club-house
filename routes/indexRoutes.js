const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router();

router.get('/', indexController.index);

router.get('/new-message', indexController.newMessageGet);
router.post('/new-message', indexController.newMessagePost);

router.get('/delete-message/:id', indexController.deleteMessageGet);
router.post('/delete-message/:id', indexController.deleteMessagePost);

module.exports = router;