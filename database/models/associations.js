import { usersModel } from './user.model.js';
import { postsModel } from './post.model.js';
import { commentsModel } from './comment.model.js';

usersModel.hasMany(postsModel, { foreignKey: 'author' });

postsModel.belongsTo(usersModel, { foreignKey: 'author', onDelete:'SET NULL' });

usersModel.hasMany(commentsModel);

commentsModel.belongsTo(usersModel);

postsModel.hasMany(commentsModel);

commentsModel.belongsTo(postsModel);
