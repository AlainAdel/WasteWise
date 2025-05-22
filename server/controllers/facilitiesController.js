// export const getFacilities = async (req, res) => {
//     const { type, zip } = req.query;
//     try {
//         // Replace this with real DB query later
//         const dummyData = [
//             { name: 'GreenRecyle Center', zip: '10001', acceptedTypes: ['plastic', 'metal'] },
//         ];

//         // Filter facilities based on query parameters
//         const matches = dummyData.filter(facility => 
//             facility.zip === zip && facility.acceptedTypes.includes(type)
//         );
//         res.json(matches);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch facilities' });
//     }
// }

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
