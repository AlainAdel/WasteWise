
import pool from '../db/index.js';

export const getMatchingFacilities = async (req, res) => {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ error: 'type is required' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM facilities
       WHERE $1 = ANY(accepted_types) OR 'all' = ANY(accepted_types)`,
      [type]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching facilities:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
};
