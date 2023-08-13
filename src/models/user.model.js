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
    defaultValue:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hobbyconsolas.com%2Fnoticias%2Fdragon-ball-super-impresionante-resina-goku-ultra-instinto-senal-completo-1012705&psig=AOvVaw0PMOa0cwpZj9sBmEDZ_RXq&ust=1691725292542000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCRuPaV0YADFQAAAAAdAAAAABAE',
    field: 'profile_img_url',
  },
  status: {
    type: DataTypes.ENUM('available', 'unavailable'),
    allowNull: false,
    defaultValue: 'available',
  },
});

module.exports = User;
