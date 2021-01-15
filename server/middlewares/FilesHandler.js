import fs from "fs";

class FilesHandler {
    constructor() {
        this.allowedMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/gif",
        ];
        this.allowedExtensions = ["jpeg", "jpg", "png", "gif", "svg"];
    }

    validateFiles({ mimetype, size, originalname }) {
        const extension = originalname.split(".").pop().toLowerCase();

        console.log(extension);

        return (
            size > 0 &&
            this.allowedMimeTypes.includes(mimetype) &&
            this.allowedExtensions.includes(extension)
        );
    }

    // deleting files using their path
    deleteFiles(paths) {
        paths.forEach((path) => {
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    }
}

export default FilesHandler;
