const express = require('express');
const cookieSession = require('cookie-session');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const router = express.Router();
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({
  connectionString: connectionString
});

router.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_SECRET]
  })
);

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const hashedPassword = user.password;

      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
        if (isMatch) {
          const { email, id } = user;
          req.session.user = { email, id };
          return res.status(200).json({ message: 'Login successful', email, id });
        } else {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error executing login query', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Logout Route
router.post('/logout', async (req, res) => {
  try {
  req.session = null;
  res.status(200).json({ message: 'Logout successful'});
  } catch (error) {
    console.error('Logout failed', error);
    res.status(500).json({ message: 'Logout failed' });
  }
});

module.exports = router;
