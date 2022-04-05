import express from "express";
const router = express.Router();

import { authorize } from "./oauth.controllers.js";

router.get("/", (_, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_ID}&scope=user:email`);
});

router.get("/get", authorize);

export default router;
