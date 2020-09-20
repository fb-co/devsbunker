import express from "express";
const router = express.Router();

import homePage from "./home.controller.js";

router.get("/", homePage);

export default router;
