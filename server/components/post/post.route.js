import express from "express";
const router = express.Router();

import { MulterForMedia, MulterForProfilePics } from "../../config/Multer.js";
import uploadMedia from "../post/upload.media.js";
import uploadProfilePicture from "../user/upload.profile.picture.js";
import rateLimit from "express-rate-limit";

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1,
});

// maximum of files = 15
router.post("/images", MulterForMedia.array("images", 15), uploadLimiter, uploadMedia);

// maximun of 1 file for the profile pic
router.post("/profile_pic", MulterForProfilePics.array("picture", 1), uploadLimiter, uploadProfilePicture);

export default router;
