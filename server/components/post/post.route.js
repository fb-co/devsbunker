import express from "express";
const router = express.Router();

import Multer from "../../config/Multer.js";
import uploadMedia from "../post/upload.media.js";

// maximum of files = 15
router.post("/images", Multer.array("images", 15), uploadMedia);

export default router;
