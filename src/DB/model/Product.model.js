import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';
import CategoryModel from './Category.model.js';
import userModel from './user.model.js';
//import discountModel from './discount.model .js';

class productModel extends Model {}

productModel.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
    type: DataTypes.STRING,
    allowNull: false
    },
    base_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    discount_price: {
        type: DataTypes.FLOAT,
    },
    attachments: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    main_image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.JSON,
        defaultValue: [] 
    },
    color: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    is_new: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Product',
    timestamps: true
});

productModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
CategoryModel.hasMany(productModel, {
    foreignKey: 'categoryId',
});

productModel.belongsTo(userModel, {
    foreignKey: 'created_by',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
userModel.hasMany(productModel, {
    foreignKey:'created_by'
});
// productModel.belongsTo(discountModel, {
//     foreignKey: 'discountId',
//     onDelete: 'SET NULL',
//     onUpdate: 'CASCADE'
// })
    
// discountModel.hasOne(productModel, {
//         foreignKey: 'discountId'
// })
export default productModel;




