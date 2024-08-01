import {Sequelize} from 'sequelize'

import('./models/user.model.js');
import('./models/post.model.js');
import('./models/comment.model.js');
import('./models/associations.js');

const sequelize = new Sequelize("mysql://ujdvfvi9t4ktcnl0:halIXTOTSmzP6pu3Qc4B@bqr6vdntlvbdwhfdskbf-mysql.services.clever-cloud.com:3306/bqr6vdntlvbdwhfdskbf")

const authentication = async () => {
    
    try {
        await sequelize.authenticate()
        console.log('connected successfully');
    } catch (err) {
        console.error('Error syncing database:', err);
    }
}

authentication()


export default sequelize  