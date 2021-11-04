const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbconnect').sequelize;

const Manager = sequelize.define('Manager', {
  first_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(30),
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
  auth: {
    type: DataTypes.STRING(10),
    defaultValue: 'manager',
  },
});

// Create table if not already created
(async () => {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
})();

module.exports = Manager;
