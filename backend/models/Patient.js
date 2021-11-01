const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbconnect').sequelize;

const Patient = sequelize.define(
  'Patient',
  {
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
      type: DataTypes.DATE,
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
  },
  {
    // Other model options go here
  }
);

// Create table if not already created
(async () => {
  await sequelize.sync();
})();

module.exports = Patient;
