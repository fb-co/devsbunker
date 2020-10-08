import express from "express";
const router = express.Router();

import isAuthorized from "./isAuthorized.js";
import {
    getAccessToken,
    revokeUserSession,
} from "../tokens/tokens.controller.js";

router.get("/auth", isAuthorized);

router.post("/refresh_token", getAccessToken);
router.post("/revoke_session", revokeUserSession);

export default router;
