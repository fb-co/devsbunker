const express = require('express');
const router = express.Router();

const login = require('./login.controller');
const signup = require('./signup.controller');
const auth = require('./isAuthorized');
const userFinder = require('./user.find');

router.get('/login', login.getLogin);
router.get('/signup', signup.getSignup);
router.get('/auth', auth.isAuthorized);
router.get('/find', userFinder.findUser);

router.post('/signup', signup.signupUser);
router.post('/login', login.loginUser);


module.exports = router;