const Patient = require('../models/Patient');
const Manager = require('../models/Manager');
const Nurse = require('../models/Nurse');
const Doctor = require('../models/Doctor');
const SelfAssessment = require('../models/SelfAssessment');
const Appointment = require('../models/Appointment');
const Comment = require('../models/Comment');
const sequelize = require('./dbconnect').sequelize;

const dbsync = async () => {
  Patient.hasMany(SelfAssessment);
  SelfAssessment.belongsTo(Patient);
  // Appointment patient
  Patient.hasMany(Appointment, { foreignKey: 'patientId' });
  Appointment.belongsTo(Patient, { foreignKey: 'patientId' });
  // Appointment nurse
  Nurse.hasMany(Appointment, { foreignKey: 'nurseId' });
  Appointment.belongsTo(Nurse, { foreignKey: 'nurseId' });
  // Comment relations
  SelfAssessment.hasMany(Comment, { foreignKey: 'selfAssessmentId' });
  Comment.belongsTo(SelfAssessment, { foreignKey: 'selfAssessmentId' });
  Nurse.hasMany(Comment, { foreignKey: 'nurseId' });
  Comment.belongsTo(Nurse, { foreignKey: 'nurseId' });

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
