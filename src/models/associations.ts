import {User} from './user';
import {WorkSession} from './workSession';

User.hasMany(WorkSession, {foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
WorkSession.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
