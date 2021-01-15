/*
    this is just the config file for Multer
    the library we use to upload files
*/

import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const FILE_PATH_FOR_MEDIA = process.env.UPLOAD_FILES_PATH;
const FILE_PATH_FOR_PROFILE_PIC = process.env.UPLOAD_PROFILE_PIC;

/**
 * ! Note: these configs are for diffente things, tehy have different paths in the hdd. Make sure to
 * ! add both entries to your env file
 * * use this:
 *   UPLOAD_FILES_PATH=./uploads/images
 *   UPLOAD_PROFILE_PIC=./uploads/profile_pics
 */

const MulterForMedia = multer({
    dest: `${FILE_PATH_FOR_MEDIA}/`,
});

const MulterForProfilePics = multer({
    dest: `${FILE_PATH_FOR_PROFILE_PIC}`,
});

export { MulterForMedia, MulterForProfilePics };
