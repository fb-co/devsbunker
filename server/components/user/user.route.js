const express = require('express');
const router = express.Router();

const login = require('./login.controller');
const signup = require('./signup.controller');
const auth = require('./isAuthorized');
const userFinder = require('./user.find');
const tokens = require('../tokens/tokens.controller');

router.get('/login', login.getLogin);
router.get('/signup', signup.getSignup);
router.get('/auth', auth.isAuthorized);
router.get('/find', userFinder.findUser);
router.get('/refresh_token', tokens.getAccessToken);

router.post('/signup', signup.signupUser);
router.post('/login', login.loginUser);


module.exports = router;