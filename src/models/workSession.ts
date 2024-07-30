import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';
import {User} from './user';

class WorkSession extends Model {
    public id!: number;
    public userId!: number;
    public startTime!: Date;
    public endTime!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

WorkSession.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'WorkSession',
    }
);

export {WorkSession};
