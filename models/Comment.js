const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbconnect').sequelize;

const Comment = sequelize.define(
  'Comment',
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

module.exports = Comment;
