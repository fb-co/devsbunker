import express from "express";
const router = express.Router();

import { getToken } from "./oauth.controllers.js";

router.get("/", (_, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_ID}`);
});

router.get("/get", getToken);

export default router;
