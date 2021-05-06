import FilesHandler from "../../middlewares/FilesHandler.js";
const filesHandler = new FilesHandler();

import Posts from "../post/post.model.js";

export default async function uploadMedia(req, res, next) {
    // FILES LIMIT ERROR HANDLED BY EXPRESS

    try {
        const files = req.files; // grabbing the files from the multipart form
        const postId = req.body.postId;

        if (req.user) {
            // if user is authorized, proceed with handling files
            if (!files) {
                res.json({
                    message: "No files found",
                });
            } else {
                const data = []; // final array with the files inside
                let unvalidData; // here we will save the unvalid file so we can serve it back to the user

                let valid = true;
                let pathsCache = []; // here we store every file and if an error occurs we remove everything even if they were valid files

                for (const file of files) {
                    pathsCache.push(`${process.env.UPLOAD_FILES_PATH}/${file.path}`);

                    if (filesHandler.validateFiles(file)) {
                        data.push({
                            ogname: file.originalname,
                            dbname: file.filename,
                        });
                    } else {
                        valid = false;
                        unvalidData = file;
                        break;
                    }
                }

                if (valid) {
                    // adding those images to the post document
                    const post = await Posts.findOne({
                        _id: postId,
                    });

                    if (post && post.author === req.user.username) {
                        post.images = data;
                        post.thumbnail = data[0].dbname;

                        // shall we add a limit?
                        await post.save();

                        res.json({
                            message: "Successfully uploaded files.",
                            data: data,
                            post: {
                                id: post._id,
                                author: post.author,
                                collaborators: post.collaborators,
                                comments: post.comments,
                                createdAt: post.createdAt,
                                description: post.description,
                                images: post.images,
                                likeAmt: post.likeAmt,
                                likes: post.likes,
                                links: post.links,
                                tags: post.tags,
                                thumbnail: post.thumbnail,
                                title: post.title,
                            },
                        });
                    } else {
                        filesHandler.deleteFiles(pathsCache); // [!] IMPORTANT: we delete everything because multer saves files immediately to the disk
                        throw new Error("Make sure the post id exists and you are the author of that post.");
                    }
                } else {
                    res.json({
                        message: "Failed to upload files.",
                        data: unvalidData,
                    });

                    filesHandler.deleteFiles(pathsCache); // [!] IMPORTANT: we delete everything because multer saves files immediately to the disk
                }
            }
        } else {
            res.status(401);
            throw new Error("Unauthorized.");
        }
    } catch (err) {
        next(err);
    }
}
