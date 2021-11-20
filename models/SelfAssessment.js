const {DataTypes} = require('sequelize');
const sequelize = require('../db/dbconnect').sequelize;

const SelfAssessment = sequelize.define(
  'SelfAssessment',
  {
    q1: {
      type: DataTypes.STRING(),
      defaultValue:
        'Are you having difficulty breathing? For example, do you feel like you’re out of breath or suffocating?',
    },
    a1: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    q2: {
      type: DataTypes.STRING(),
      defaultValue: 'Are you experiencing ANY of the following symptoms?',
    },
    a2: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    q3: {
      type: DataTypes.STRING(),
      defaultValue: 'Are you experiencing at least 2 of the following symptoms?',
    },
    a3: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    q4: {
      type: DataTypes.STRING(),
      defaultValue:
        'Are you or the person who is going to get tested in one of the situations below?',
    },
    a4: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    q5: {
      type: DataTypes.STRING(),
      defaultValue:
        'Have you been in close contact with a confirmed or probable case of COVID-19?',
    },
    a5: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    q6: {
      type: DataTypes.STRING(),
      defaultValue: 'Have you been tested for COVID-19?',
    },
    a6: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    q7: {
      type: DataTypes.STRING(),
      defaultValue:
        'Have you or someone close to you travelled outside of Canada within the last 14 days?',
    },
    a7: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    nurseReviewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    nurseComment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rejected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    // Other model options go here
  }
);

module.exports = SelfAssessment;
