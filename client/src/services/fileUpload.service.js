//import { store } from "../store/store";

//const URL = process.env.UPLOAD_FILES_PATH;

const FileUploadService = {
    addPostImages: async function(image, postId, token) {
        console.log("PLZ");

        const data = {
            media: image,
            postId: postId,
            token: token
        };

        // READ : WERE GONNA NEED TO MAKE A ENV ENTRY FOR THE REST ENDPOINT, FOR NOW I HARD CODED THE LINK SO IF YOU WANT TO TEST CHANGE IT YOUR LINK

        const response = await fetch("http://192.168.0.45:5000/upload/media", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        return response.json();
    }
};

export default FileUploadService;