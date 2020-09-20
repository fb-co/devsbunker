import express from "express";
const router = express.Router();

import { getLogin, loginUser } from "./user.login.js";
import { getSignup, signupUser } from "./user.signup.js";
import logoutUser from "./user.logout.js";
import isAuthorized from "./isAuthorized.js";
import findUser from "./user.find.js";
import {
    getAccessToken,
    revokeUserSession,
} from "../tokens/tokens.controller.js";

router.get("/login", getLogin);
router.get("/signup", getSignup);
router.get("/auth", isAuthorized);
router.get("/find", findUser);

router.post("/refresh_token", getAccessToken);
router.post("/revoke_session", revokeUserSession);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
