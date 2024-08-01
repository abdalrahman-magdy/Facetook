import { Router } from "express";
import {
    addPost, getPosts, getspecificPost,
    updatePost, undeletePost, deletePost
} from "./postsControllers.js";

const postsRouter = Router()

postsRouter.post('/add-post', addPost)
postsRouter.get('/get-all-posts', getPosts)
postsRouter.get('/get-post:postId', getspecificPost)
postsRouter.put('/update-post', updatePost)
postsRouter.put('/restore-post', undeletePost)
postsRouter.delete('/delete-post', deletePost)


export default postsRouter;

