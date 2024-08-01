import { Router } from "express";
import { signUp,logIn, logOut,getInfo } from "./usersControllers.js"
const usersRouter = Router()

usersRouter.post('/login', logIn)
usersRouter.post('/',  signUp)
usersRouter.post('/logout', logOut)
usersRouter.get('/get-user:userId-info:postId',getInfo)

export default usersRouter;