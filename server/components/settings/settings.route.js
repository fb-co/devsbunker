import express from "express";
const router = express.Router();

import getPrefrences from "./prefrences.controller.js";

// Here we should send a basic settings page
router.get("/", (req, res) => {
    res.json({
        message: "Account settings",
    });
});

// settings sub-routes ex: (prefrences, account, privacy/security, etc.)
router.get("/prefrences", getPrefrences);

export default router;
