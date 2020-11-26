//import { store } from "../store/store";

//const URL = process.env.UPLOAD_FILES_PATH;

const FileUploadService = {
    addPostImages: async function(files, postId, token) {
        const formData = new FormData();

        for (const file in files) {
            formData.append("media", files[file]);
        }

        formData.append("postId", postId);
        formData.append("token", token);

        const response = await fetch("http://192.168.0.45:5000/upload/media", {
            method: "POST",
            body: formData,
        });

        return response.json();
    },
};

export default FileUploadService;
