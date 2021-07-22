import express from "express";
const router = express.Router();

import { MulterForMedia, MulterForProfilePics } from "../../config/Multer.js";
import uploadMedia from "../post/upload.media.js";
import uploadProfilePicture from "../user/upload.profile.picture.js";

import { LimiterOneReq15Min } from "../../config/RateLimiter.js";

// maximum of files = 15
router.post("/images", MulterForMedia.array("images", 15), LimiterOneReq15Min, uploadMedia);

// maximun of 1 file for the profile pic
router.post("/profile_pic", MulterForProfilePics.array("picture", 1), LimiterOneReq15Min, uploadProfilePicture);

export default router;
