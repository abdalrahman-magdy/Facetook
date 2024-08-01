import  sequelize  from '../dbconnection.js'
import { DataTypes } from 'sequelize'


const commentsModel = sequelize.define('comment', {
    content: {
        type: DataTypes.STRING()
    }
})

export { commentsModel }
