import express from 'express';
import pool from '../db/index.js';

const router = express.Router();

router.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send("Database connection failed");
  }
});

export default router;
