const express = require('express');
const registerRouter = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');



registerRouter.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    const existingUser = await db.query('SELECT * FROM USERS WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO users (first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5)', [firstName, lastName, email, username, hashedPassword]);
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration failed', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

module.exports = registerRouter;