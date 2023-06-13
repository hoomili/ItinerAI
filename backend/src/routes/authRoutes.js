const express = require('express');
const { Pool } = require('pg');

const router = express.Router();
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({
  connectionString: connectionString
});
// Login Route
router.post('/login', async(req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const values = [email, password];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const { email, username } = user
      res.status(200).json({ message: 'Login successful', email, username });
    } else {
      res.status(401).json({ message: 'Invalid email or password'});
    }
  } catch (error) {
    console.error('Error executing login query', error);
    res.status(500).json({ message: 'Internal server error'});
  }
});

// Logout Route
router.post('/logout', async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error logging out:', err);
      res.status(500).json({ message: 'Internal server errror'});
    } else {
      res.status(200).json({ message: 'Logout successful'});
    }
  });
});

module.exports = router;