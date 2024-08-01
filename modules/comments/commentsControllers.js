import { commentsModel } from "../../database/models/comment.model.js";
import { postsModel } from "../../database/models/post.model.js";
import { usersModel } from "../../database/models/user.model.js";

const addComment = async (req, res) => {
    const { content, userId, postId } = req.body

    try {
        let comment = await commentsModel.create(
            {
                content: content,
                userId: userId,
                postId: postId
            }
        )
        return res.status(200).json({ message: "comment added", commentId: comment.id })


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const getComments = async (req, res) => {
    try {
        const specificPost = req.params.postId
        if (specificPost) {
            const postscomments = await commentsModel.findAll(
                {
                    include: [{
                        model: postsModel,
                        attributes: ["title", "content"],
                        where: { id: specificPost }
                    },{model:usersModel,
                        attributes:['name']
                    }],
                    where: { postId: specificPost },
                    attributes:{
                        exclude:['createdAt','postId','userId']
                    }
                }
            )
            if (postscomments != 0)
                return res.status(200).json({ postscomments })
            else
                return res.status(200).json({ message: `post's comments not found` })
        } else {
            const { count, rows } = await commentsModel.findAndCountAll({
                include: [{ 
                    model: usersModel,
                    attributes: ["name"] 
                },{
                    model:postsModel,
                    attributes:['title']
                }
                ],
                attributes: { 
                    exclude: ['createdAt', 'userId','postId'] 
                }
            })
            return res.status(200).json({ message: "success", allcomments: count, comments: rows })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const updateComment = async (req, res) => {
    const { authorId,id, content } = req.body;
    try {
        let comment = await commentsModel.update(
            {
                content: content
            },
            {
                where: { id: id ,userId:authorId}
            }
        )
        if (comment != 0)
            return res.status(200).json({ message: "comment updated", commentUpdated: comment });
        else
            return res.status(404).json({ message: "comment not found" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


const deleteComment = async (req, res) => {
    const { authorId, id } = req.body
    try {
        let comment = commentsModel.destroy({
            where: {
                userId:authorId,
                id: id
            }
        }
        )
        if (comment != 0)
            return res.status(200).json({ message: "comment deleted" });
        else
            return res.status(404).json({ message: "comment not found" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export {
    addComment, getComments, updateComment, deleteComment
}