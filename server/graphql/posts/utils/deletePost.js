import Posts from "../../../components/post/post.model.js";
import FilesHandler from "../../../middlewares/FilesHandler.js";

const fh = new FilesHandler();

export default async function deletePost(postAuthor, postId) {
    if (!postAuthor && !postId) {
        throw new Error("Invalid params in function 'deletePost'");
    }

    if (postAuthor) {
        return new Promise((resolve, reject) => {
            Posts.find({ author: postAuthor, enabled: true })
                .then((ret) => {
                    if (ret) {
                        let buf = [];

                        ret.forEach((post) => {
                            post.images.forEach((asset) => {
                                buf.push(`${process.env.UPLOAD_FILES_PATH}/${asset.dbname}`);
                            });
                            post.remove();
                        });

                        fh.deleteFiles(buf);
                        resolve(ret);
                    } else {
                        reject(new Error("Unable to find post"));
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    } else {
        return new Promise((resolve, reject) => {
            Posts.findOneAndDelete({ _id: postId, enabled: true })
                .then((deleted) => {
                    if (deleted) {
                        let buf = [];

                        deleted.images.forEach((asset) => {
                            buf.push(`${process.env.UPLOAD_FILES_PATH}/${asset.dbname}`);
                        });

                        fh.deleteFiles(buf);
                        resolve(deleted);
                    } else {
                        reject(new Error("Unable to find post"));
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }
}
