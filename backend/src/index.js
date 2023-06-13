require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const registerRouter = require('./routes/registerRoute');
const app = express();
const server = require('http').Server(app);
const openai = require('openai');
const sass = require('sass');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use('/register', registerRouter);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
