const express = require('express');
const router = express.Router();

const home = require('./about.controller');

router.get('/', home.aboutPage);

module.exports = router;