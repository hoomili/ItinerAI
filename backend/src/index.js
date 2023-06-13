require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const openai = require('openai');
const sass = require('sass');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const registerRouter = require('./routes/registerRoute');
const apiRoutes = require('./routes/api')
const morgan = require('morgan');
const { Client } = require('pg');

// app.use(cors());

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
app.use(express.json());
app.use(express.static('public'))
app.use(morgan('dev'));
app.use(cors());

// app.use('/api', apiRoutes)
app.use('/api', apiRoutes);
app.use(authRoutes);
app.use('/register', registerRouter);

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = client;