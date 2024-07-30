import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';

class User extends Model {
    public id!: number;
    public name!: string | null;
    public email!: string | null;
    public createdAt!: Date;
    public updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export {User};
