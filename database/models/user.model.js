import  sequelize  from '../dbconnection.js'
import { DataTypes } from 'sequelize'

const usersModel = sequelize.define('user', {
    name: {
        type: DataTypes.STRING(100),
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true
    }, 
    password: {
        type: DataTypes.STRING(100)
    }
});


export { usersModel }
