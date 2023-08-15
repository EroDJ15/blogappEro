const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const User = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordChangeAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'password_change_at',
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'), // Utiliza DataTypes.ENUM en lugar de DataTypes.enum
    allowNull: false,
    defaultValue: 'user',
  },
  profileimage: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'goku',
    field: 'profile_img_url',
  },
  status: {
    type: DataTypes.ENUM('available', 'unavailable'),
    allowNull: false,
    defaultValue: 'available',
  },
});

module.exports = User;
