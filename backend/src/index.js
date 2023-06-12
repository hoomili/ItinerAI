require('dotenv').config();
const openai = require('openai');
const sass = require('sass');
const PORT = process.env.PORT || 8080;

const express = require('express');
const app = express();
const server = require('http').Server(app);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
