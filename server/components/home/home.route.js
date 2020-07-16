const express = require('express');
const router = express.Router();

const home = require('./home.controller');

router.get('/', home.homePage);

module.exports = router;