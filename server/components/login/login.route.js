const express = require('express');
const router = express.Router();

const home = require('./login.controller');

router.get('/', home.loginPage);

module.exports = router;