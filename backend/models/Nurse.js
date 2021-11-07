const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbconnect').sequelize;

const Nurse = sequelize.define('Nurse', {
  // Model attributes are defined here
  first_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    // allowNull defaults to true
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(),
  },
  phone: {
    type: DataTypes.STRING(15),
  },
  registration_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  auth: {
    type: DataTypes.STRING(10),
    defaultValue: 'nurse',
  },
  admin_approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Nurse;
