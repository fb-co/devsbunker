const express = require('express');
const router = express.Router();

const login = require('./user.login');
const signup = require('./user.signup');
const logout = require('./user.logout');
const auth = require('./isAuthorized');
const userFinder = require('./user.find');
const tokens = require('../tokens/tokens.controller');

router.get('/login', login.getLogin);
router.get('/signup', signup.getSignup);
router.get('/auth', auth.isAuthorized);
router.get('/find', userFinder.findUser);

router.post('/refresh_token', tokens.getAccessToken);
router.post('/signup', signup.signupUser);
router.post('/login', login.loginUser);
router.post('/logout', logout.logoutUser);


module.exports = router;