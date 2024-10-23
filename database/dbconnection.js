import {Sequelize} from 'sequelize'

import('./models/user.model.js');
import('./models/post.model.js');
import('./models/comment.model.js');
import('./models/associations.js');

const sequelize = new Sequelize('offline','root','',{
    dialect:'mysql',
    
})

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
