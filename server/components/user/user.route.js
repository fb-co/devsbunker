const express = require('express');
const router = express.Router();

const login = require('./login.controller');
const signup = require('./signup.controller');

router.get('/login', login.getLogin);
router.get('/signup', signup.getSignup);

module.exports = router;