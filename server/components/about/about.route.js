const express = require('express');
const router = express.Router();

const about = require('./about.controller');

router.get('/', about.aboutPage);

module.exports = router;