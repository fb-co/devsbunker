import FilesHandler from "../../middlewares/FilesHandler.js";
const filesHandler = new FilesHandler();

export default function uploadMedia(req, res, next) {
    // FILES LIMIT ERROR HANDLED BY EXPRESS

    try {
        const files = req.files; // grabbing the files from the multipart form

        if (!files) {
            res.json({
                message: "No files detected",
            });
        } else {
            const data = []; // final array with the files inside
            let unvalidData; // here we will save the unvalid file so we can serve it back to the user

            let valid = true;
            let pathsCache = []; // here we store every file and if an error occurs we remove everything even if they were valid files

            for (const file of files) {
                pathsCache.push(file.path);

                if (filesHandler.validateFiles(file)) {
                    data.push({
                        name: file.originalname,
                        mimetype: file.mimetype,
                        size: file.size,
                    });
                } else {
                    valid = false;
                    unvalidData = file;
                    break;
                }
            }

            if (valid) {
                res.json({
                    message: "Successfully uploaded files.",
                    data: data,
                });
            } else {
                res.json({
                    message: "Failed to upload files.",
                    data: unvalidData,
                });

                filesHandler.deleteFiles(pathsCache); // [!] IMPORTANT: we delete everything because multer saves files immediately to the disk
            }
        }
    } catch (err) {
        next(err);
    }
}
