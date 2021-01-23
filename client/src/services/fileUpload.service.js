const IMG_URL = process.env.VUE_APP_IMAGES_ENDPOINT;
const PROFILE_URL = process.env.VUE_APP_PROFILE_PIC_ENDPOINT;

const FileUploadService = {
    // TODO: update this to use new auth sys
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
    uploadProfilePic: async function(file, token) {
        const formData = new FormData();

        formData.append("picture", file);

        try {
            const response = await fetch(PROFILE_URL, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`,
                },
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
