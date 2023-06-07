require('dotenv').config();
const sass = require('sass');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api')
const morgan = require('morgan');
const { Client } = require('pg');


// Connect to Database
const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

client.connect();



// Express config
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/api', apiRoutes)


// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = client;