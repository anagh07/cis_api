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
    doctorAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
    },
  }
  /*
  nurseId: foreignKey
  patientId: foreignKey
  doctorId: foreignKey
  saId: foreignKey
   */
);

module.exports = Appointment;
