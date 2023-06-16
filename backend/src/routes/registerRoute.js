const express = require('express');
const registerRouter = express.Router();
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({
  connectionString: connectionString
});



registerRouter.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, profilePic, password } = req.body;

    const existingUser = await pool.query('SELECT * FROM USERS WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO users (first_name, last_name, email, profile_pic, password) VALUES ($1, $2, $3, $4, $5)', [firstName, lastName, email, profilePic, hashedPassword]);
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration failed', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

module.exports = registerRouter;