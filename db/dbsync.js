const Patient = require('../models/Patient');
const Manager = require('../models/Manager');
const Nurse = require('../models/Nurse');
const Doctor = require('../models/Doctor');
const SelfAssessment = require('../models/SelfAssessment');
const Appointment = require('../models/Appointment');
const Comment = require('../models/Comment');
const sequelize = require('./dbconnect').sequelize;

const dbsync = async () => {
  Patient.hasMany(SelfAssessment, { onDelete: 'CASCADE' });
  SelfAssessment.belongsTo(Patient, { onDelete: 'CASCADE' });
  // Appointment patient
  Patient.hasMany(Appointment, { foreignKey: 'patientId', onDelete: 'CASCADE' });
  Appointment.belongsTo(Patient, { foreignKey: 'patientId', onDelete: 'CASCADE' });
  // Appointment nurse
  Nurse.hasMany(Appointment, { foreignKey: 'nurseId', onDelete: 'CASCADE' });
  Appointment.belongsTo(Nurse, { foreignKey: 'nurseId', onDelete: 'CASCADE' });
  // Appointment doctor
  Doctor.hasMany(Appointment, { foreignKey: 'doctorId', onDelete: 'CASCADE' });
  Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', onDelete: 'CASCADE' });
  // Appointment SA
  SelfAssessment.hasOne(Appointment, { foreignKey: 'saId' });
  Appointment.belongsTo(SelfAssessment, { foreignKey: 'saId' });
  // Comment relations
  SelfAssessment.hasMany(Comment, {
    foreignKey: 'selfAssessmentId',
    onDelete: 'CASCADE',
  });
  Comment.belongsTo(SelfAssessment, {
    foreignKey: 'selfAssessmentId',
    onDelete: 'CASCADE',
  });
  Nurse.hasMany(Comment, { foreignKey: 'nurseId', onDelete: 'CASCADE' });
  Comment.belongsTo(Nurse, { foreignKey: 'nurseId', onDelete: 'CASCADE' });

  // Create table if not already created
  await (async () => {
    try {
      console.log('### Syncing');
      await sequelize.sync();
      // await sequelize.drop();
    } catch (error) {
      return console.log(error);
    }
  })();
};

module.exports = dbsync;
