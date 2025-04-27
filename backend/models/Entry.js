import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Entry = sequelize.define('Entry', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entryDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  moodColor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reflection: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

export default Entry;
