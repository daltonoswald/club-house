const express = require('express');
const userController = require('../controllers/userController');
const isSignedIn = require('../middleware').isSignedIn;
const alreadySignedIn = require('../middleware').alreadySignedIn;

const router = express.Router();

router.get('/log-in', alreadySignedIn, userController.userLogInGet);
router.post('/log-in', alreadySignedIn, userController.userLogInPost);
router.get('/logout', userController.userLogout);

router.get('/sign-up', alreadySignedIn, userController.userSignUpGet);
router.post('/sign-up', alreadySignedIn, userController.userSignUpPost);

router.get('/join-club', isSignedIn, userController.userJoinClubGet);
router.post('/join-club', isSignedIn, userController.userJoinClubPost);

router.get('/become-admin', isSignedIn, userController.userBecomeAdminGet);
router.post('/become-admin', isSignedIn, userController.userBecomeAdminPost);

router.get('/profile/:userid', isSignedIn, userController.userProfileGet);

module.exports = router;