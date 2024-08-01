import   sequelize    from '../dbconnection.js'
import { DataTypes } from 'sequelize'




const postsModel = sequelize.define('post', {
    title: {
        type: DataTypes.STRING(100)
    },
    content: {
        type: DataTypes.STRING()
    },
    is_deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue:0
    }
    
})



export { postsModel }

