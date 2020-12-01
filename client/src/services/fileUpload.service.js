const IMG_URL = process.env.VUE_APP_IMAGES_ENDPOINT;

const FileUploadService = {
    addPostImages: async function(files, postId, token) {
        const formData = new FormData();

        for (const file in files) {
            formData.append("images", files[file]);
        }

        formData.append("postId", postId);
        formData.append("token", token);

        try {
            const response = await fetch(IMG_URL, {
                method: "POST",
                body: formData,
            });

            return response.json();
        } catch (e) {
            console.error(e);
            return false;
        }
    },
};

export default FileUploadService;
