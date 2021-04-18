import Posts from "../../../components/post/post.model.js";
import FilesHandler from "../../../middlewares/FilesHandler.js";

const fh = new FilesHandler();

export default async function deletePost(postAuthor, postId) {
    if (!postAuthor && !postId) {
        throw new Error("Invalid params in function 'deletePost'");
    }

    if (postAuthor) {
        return new Promise((resolve) => {
            // TODO: delete posts assets
            Posts.deleteMany({ author: postAuthor })
                .then((ret) => {
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
                    // delete assets
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
