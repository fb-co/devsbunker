import FilesHandler from "../../middlewares/FilesHandler.js";
const filesHandler = new FilesHandler();

// import User from "../user/user.model.js";

export default async function uploadProfilePicture(req, res, next) {
    try {
        const user = req.user;

        if (user) {
            const file = req.files[0];

            if (file) {
                const data = [];
                let unvalidData;

                let valid = true;
                let pathsCache = [];

                pathsCache.push(file.path);

                if (filesHandler.validateFiles(file)) {
                    data.push({
                        ogname: file.originalname,
                        dbname: file.filename,
                    });
                } else {
                    valid = false;
                    unvalidData = file;
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

                    filesHandler.deleteFiles(pathsCache);
                }
            } else {
                throw new Error("Please upload a file.");
            }
        } else {
        }
    } catch (err) {
        next(err);
    }
}
