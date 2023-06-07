require('dotenv').config();
const openai = require('openai');
const sass = require('sass');
const PORT = process.env.PORT || 8080;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const { Client } = require('pg');

app.use(bodyParser.json());

//Connect to Database
const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

client.connect();

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
