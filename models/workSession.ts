import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../src/config/database';
import { User } from './user';

interface WorkSessionAttributes {
    id: number;
    userId: number;
    startTime: Date;
    endTime?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}

interface WorkSessionCreationAttributes extends Optional<WorkSessionAttributes, 'id'> {}

export class WorkSession extends Model<WorkSessionAttributes, WorkSessionCreationAttributes> implements WorkSessionAttributes {
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

// Define association
WorkSession.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(WorkSession, { foreignKey: 'userId' });
