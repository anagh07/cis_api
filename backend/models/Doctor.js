const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbconnect').sequelize;

const Doctor = sequelize.define('Doctor', {
  // Model attributes are defined here
  first_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
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
    defaultValue: 'doctor',
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Doctor;
