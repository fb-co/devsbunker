const express = require('express');
const router = express.Router();

const login = require('./login.controller');

router.get('/', login.loginPage);

module.exports = router;