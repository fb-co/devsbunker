import express from "express";
const router = express.Router();

import aboutPage from "./about.controller.js";

router.get("/", aboutPage);

export default router;
