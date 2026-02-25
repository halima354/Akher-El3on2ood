import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection.js';

class userModel extends Model {}

userModel.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin'),
        allowNull: false,
        defaultValue: 'admin'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    forgetPasswordOTP: {
    type: DataTypes.STRING,
    allowNull: true
    },
    OTPExpiry: {
    type: DataTypes.DATE,
    },
    changeCredentialTime: {
    type: DataTypes.DATE,
}
}, {
    sequelize,
    modelName: 'User',
    timestamps: false
});
export default userModel;


