import {Router} from 'express'
import { addComment, deleteComment, getComments, updateComment} from './commentsControllers.js'

const commentsRouter = Router();

commentsRouter.post('/add-comment',addComment)

commentsRouter.get('/get-all-comments',getComments)
commentsRouter.get('/get-comments/:postId',getComments)

commentsRouter.put('/update-comment',updateComment)

commentsRouter.delete('/delete-comment',deleteComment)
export default commentsRouter