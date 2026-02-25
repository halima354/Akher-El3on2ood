import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';
import userModel from './user.model.js';
class CategoryModel extends Model {}

CategoryModel.init(
    {
    name: {
    type: DataTypes.STRING,
    allowNull: false
    },
    attachments: {
    type: DataTypes.JSON
    },
    created_by: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    description: {
    type: DataTypes.STRING,
    allowNull: false
    },
    },
    {
    sequelize,
    modelName: 'Category',
    timestamps: true
    }
);
CategoryModel.belongsTo(userModel, {
    foreignKey: 'created_by',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
userModel.hasMany(CategoryModel, {
    foreignKey: 'created_by'
});
export default CategoryModel;

