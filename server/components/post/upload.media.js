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
            if (!(files.length > 0)) {
                // if no files were attached proceed to create the post anyway

                const post = await Posts.findOne({
                    _id: postId,
                });

                if (post && post.author === req.user.username) {
                    post.thumbnail = "@/assets/project_img_placeholder.png";

                    await post.save();

                    // NOTE: after a post is saved to the db it obv has 0 likes so we set the isLiked and isSaved fields to false.
                    // remember that these fields ARE not present in the mongoose post document, they are independent fields needed for the UI
                    res.json({
                        message: "Successfully uploaded 0 files.",
                        post: {
                            id: post._id,
                            title: post.title,
                            author: post.author,
                            description: post.description,
                            thumbnail: post.thumbnail,
                            images: post.images,
                            links: post.links,
                            collaborators: post.collaborators,
                            tags: post.tags,
                            likes: post.likes,
                            likeAmt: post.likeAmt,
                            isLiked: false,
                            isSaved: false,
                            price: post.price,
                            createdAt: post.createdAt,
                            comments: post.comments,
                        },
                    });
                } else {
                    filesHandler.deleteFiles(pathsCache); // [!] IMPORTANT: we delete everything because multer saves files immediately to the disk
                    throw new Error("Make sure the post id exists and you are the author of that post.");
                }
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

                    console.log(post);

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
                                title: post.title,
                                author: post.author,
                                description: post.description,
                                images: post.images,
                                links: post.links,
                                thumbnail: post.thumbnail,
                                collaborators: post.collaborators,
                                tags: post.tags,
                                likes: post.likes,
                                likeAmt: post.likeAmt,
                                isLiked: false,
                                isSaved: false,
                                price: post.price,
                                createdAt: post.createdAt,
                                comments: post.comments,
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
