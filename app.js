import express from 'express'
import sequelize from './database/dbconnection.js';
import usersRouter from './modules/users/usersRoutes.js'
import postsRouter from './modules/posts/postsRoutes.js'
import commentsRouter from './modules/comments/commentsRoutes.js';
import cors from "cors"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/', usersRouter)
app.use('/posts', postsRouter)
app.use('/comments', commentsRouter)

sequelize.sync({ }).then(() => {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}).catch(error => console.error('Unable to sync database:', error)); 