const express = require('express');
const itinerariesRouter = express.Router();
const { Pool } = require('pg');

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({
  connectionString: connectionString
});

itinerariesRouter.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const query = 'SELECT * FROM ITINERARIES WHERE user_id = $1';
    const values = [userId];
    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error executing itinerary query', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = itinerariesRouter;