import { postsModel } from "../../database/models/post.model.js";
import { usersModel } from "../../database/models/user.model.js";



const addPost = async (req, res) => {
    const { title, content, author } = req.body

    try {

        const userExists = await usersModel.findByPk(author);
        if (!userExists) {
            return res.status(400).json({ message: 'Invalid author ID' });
        }
        await postsModel.create({
            title: title,
            content: content,
            author: author
        })
        return res.status(200).json({ message: "Post added" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const getPosts = async (req, res) => {
    try {
        let { count, rows } = await postsModel.findAndCountAll({
            include: { model: usersModel, attributes: ['name'] },
            where: { is_deleted: 0 },
            attributes: {
                exclude: ["createdAt", "updatedAt", "is_deleted"],
            }
        })
        return res.status(200).json({ message: "success", allPosts: count, posts: rows })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const getspecificPost = async (req, res) => {
    const specificPost = req.params.postId
    console.log(specificPost);
    try {
        const post = await postsModel.findOne({

            include: {
                model: usersModel,
                attributes: ['name']
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "is_deleted"],
            },
            where: {
                id: specificPost
            },
        })

        if (!post) {
            return res.status(404).json({ message: "not found" });
        }

        if (!post.is_deleted)
            return res.status(200).json({ message: "success", post })
        else
            return res.status(404).json({ message: "post deleted" })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });

    }
}


const updatePost = async (req, res) => {
    const { authorId, id, title, content } = req.body

    try {
        const post = await postsModel.findOne({
            where: {
                id: id,
                author: authorId
            }
        })
        if (!post)
            return res.status(404).json({ message: "Post not found" });

        if (post.is_deleted)
            return res.status(404).json({ message: "Post deleted" });

        let updatePost = await post.update(
            {
                title: title,
                content: content
            }
        )

        return res.status(200).json({ message: "Post updated", postsUpdated: updatePost });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const undeletePost = async (req, res) => {
    const {  authorId,  postId } = req.body
    try {
        let post = await postsModel.findOne({
            where: {
                author: authorId,
                id: postId
            }
        })

        if (!post)
            return res.status(404).json({ message: "Post not found" });

        if (!post.is_deleted)
            return res.status(200).json({ message: "Post isn't deleted" });

        post.update({
            is_deleted: 0
        })

        if (post != 0)
            return res.status(200).json({ message: "Post restored" });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const deletePost = async (req, res) => {
    const { authorId, id } = req.body
    try {
        let post = await postsModel.findOne({
            where: {
                author: authorId,
                id: id
            }
        })
        if (!post)
            return res.status(404).json({ message: "Post not found" });

        if (post.is_deleted)
            return res.status(200).json({ message: "Post deleted already" });

        post.update({
            is_deleted: 1
        })
        if (post != 0)
            return res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


export {
    addPost, getPosts, getspecificPost,
    updatePost, deletePost, undeletePost
}