import Posts from "../../../components/post/post.model.js";
import FilesHandler from "../../../middlewares/FilesHandler.js";

const fh = new FilesHandler();

export default async function deletePost(postAuthor, postId) {
    if (!postAuthor && !postId) {
        throw new Error("Invalid params in function 'deletePost'");
    }

    if (postAuthor) {
        return new Promise((resolve) => {
            Posts.find({ author: postAuthor })
                .then((ret) => {
                    let buf = [];

                    ret.forEach((post) => {
                        post.images.forEach((asset) => {
                            buf.push(
                                `${process.env.UPLOAD_FILES_PATH}/${asset.dbname}`
                            );
                        });
                        post.remove();
                    });

                    fh.deleteFiles(buf);
                    resolve(ret);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    } else {
        return new Promise((resolve) => {
            Posts.findOneAndDelete({ _id: postId })
                .then((deleted) => {
                    let buf = [];

                    deleted.images.forEach((asset) => {
                        buf.push(
                            `${process.env.UPLOAD_FILES_PATH}/${asset.dbname}`
                        );
                    });

                    fh.deleteFiles(buf);
                    resolve(deleted);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }
}
