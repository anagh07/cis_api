const express = require('express');
const app = express();
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./documentation/swaggerSetup');
const db = require('./db/dbconnect');
const dbsync = require('./db/dbsync');

// Body parser
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Default route
app.get('/', (req, res, next) => {
  res.send('Server running');
});

// Routes
app.use('/patient', require('./routes/patient'));
app.use('/manager', require('./routes/manager'));
app.use('/nurse', require('./routes/nurse'));
app.use('/doctor', require('./routes/doctor'));
app.use('/auth', require('./routes/auth'));
app.use('/sa', require('./routes/selfassessment'));

// Connect DB and Initialize server
const PORT = process.env.PORT;
(async function () {
  await db.connetDb();
  await dbsync();
  app.listen(PORT, () => {
    console.log(`#### Server running on port ${PORT}...`);
  });
})();
