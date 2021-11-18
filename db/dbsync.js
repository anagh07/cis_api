const Patient = require('../models/Patient');
const Manager = require('../models/Manager');
const Nurse = require('../models/Nurse');
const Doctor = require('../models/Doctor');
const SelfAssessment = require('../models/SelfAssessment');
const sequelize = require('./dbconnect').sequelize;

const dbsync = async () => {
  Patient.hasMany(SelfAssessment);
  SelfAssessment.belongsTo(Patient);

  // Create table if not already created
  await (async () => {
      try {
          console.log('### Syncing');
          await sequelize.sync();
      } catch (error) {
          return console.log(error);
      }
  })();
};

module.exports = dbsync;
