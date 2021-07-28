import express from "express";
const router = express.Router();

import { MulterForMedia, MulterForProfilePics } from "../../config/Multer.js";
import uploadMedia from "../post/upload.media.js";
import uploadProfilePicture from "../user/upload.profile.picture.js";

import craftRateLimiter from "../../config/RateLimiter.js";

// maximum of files = 15
router.post("/images", MulterForMedia.array("images", 15), craftRateLimiter(15, 3), uploadMedia);

// maximun of 1 file for the profile pic
router.post("/profile_pic", MulterForProfilePics.array("picture", 1), craftRateLimiter(15, 3), uploadProfilePicture);

export default router;
