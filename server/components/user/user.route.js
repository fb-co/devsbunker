const express = require('express');
const router = express.Router();

const login = require('./login.controller');
const signup = require('./signup.controller');

router.get('/login', login.getLogin);
router.get('/signup', signup.getSignup);

router.post('/signup', signup.signupUser);
router.post('/login', login.loginUser);

module.exports = router;