const express = require('express');
const router = express.Router();

const prefrences = require('./prefrences.controller');

// Here we should send a basic settings page
router.get('/', (req, res) => {
    res.json({
        message: "Account settings"
    });
});

// settings sub-routes ex: (prefrences, account, privacy/security, etc.)
router.get('/prefrences', prefrences.getPrefrences);

module.exports = router;