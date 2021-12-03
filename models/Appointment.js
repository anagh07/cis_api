const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbconnect').sequelize;

const Appointment = sequelize.define(
  'Appointment',
  {
    datetime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }
  /*
  nurseId: foreignKey
  patientId: foreignKey
   */
);

module.exports = Appointment;
