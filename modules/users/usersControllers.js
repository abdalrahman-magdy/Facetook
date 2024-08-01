import { commentsModel } from "../../database/models/comment.model.js";
import { postsModel } from "../../database/models/post.model.js";
import { usersModel } from "../../database/models/user.model.js";
import bcrypt from 'bcrypt';

const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (typeof password !== 'string') {
        return res.status(400).json({ message: 'Password must be a string' });
    }

    try {

        const checkUser = await usersModel.findAll({
            where: {
                email: email
            }
        });

        if (checkUser.length > 0) {
            return res.status(409).json({ message: 'E-mail already exists' });
        }

        const hashedPass = await bcrypt.hash(password, 8);

        await usersModel.create({
            name: name,
            email: email,
            password: hashedPass
        });

        res.status(200).json({ message: "User registered" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await usersModel.findOne({ where: { email: email } })
        if (!checkUser)
            return res.status(404).json({ message: 'User not found' });

        const checkPass = await bcrypt.compare(password, checkUser.password)

        if (!checkPass)
            return res.status(401).json({ message: 'Incorrect password' });

        const posts = await postsModel.findAll()
        res.status(200).json({ message: 'Login successful!\n For you page: ', posts });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const logOut = async (req, res) => {
    return res.status(200).json({ message: 'logout successful' })
}

const getInfo = async (req, res) => {
    const user = req.params.userId;
    const post = req.params.postId;

    try {
        const getUserPost = await usersModel.findOne({
            include: {
                model: postsModel,
                where:{
                    id:post
                },attributes:[['id','postId'],'title']

            },
            where: {
                id: user
            },
            attributes:[['id','userId'],'name']
            
        })
        const getPostComment = await commentsModel.findAll({
        where: {
            postId:post
        },
        attributes:[['id','commentId'],'content','postId']
        })

        const allInfo = [getUserPost,getPostComment]
        return res.status(200).json({ allInfo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}



export { signUp, logIn, logOut, getInfo };
