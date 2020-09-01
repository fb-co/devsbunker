const express = require('express');
const router = express.Router();

const home = require('./profile.controller');

router.get('/', home.homePage);

module.exports = router;