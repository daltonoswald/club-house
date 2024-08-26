const express = require('express');
// const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/log-in', userController.userLogInGet);
router.post('/log-in', userController.userLogInPost);
router.get('/logout', userController.userLogout);

router.get('/sign-up', userController.userSignUpGet);
router.post('/sign-up', userController.userSignUpPost);

router.get('/join-club', userController.userJoinClubGet);
router.post('/join-club', userController.userJoinClubPost);

router.get('/become-admin', userController.userBecomeAdminGet);
router.post('/become-admin', userController.userBecomeAdminPost);

module.exports = router;