/*
    this is just the config file for Multer
    the library we use to upload files
*/

import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const FILE_PATH = process.env.UPLOAD_FILES_PATH; // grabs path from ENV file

const Multer = multer({
    dest: `${FILE_PATH}/`,
});

export default Multer;
