const express = require('express');
const router = express.Router();

const signup = require('./signup.controller');

router.get('/', signup.signupPage);
router.post('/', signup.signupUser);

module.exports = router;