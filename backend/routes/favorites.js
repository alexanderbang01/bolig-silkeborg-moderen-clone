const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/auth');

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// GET /api/favorites
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      `SELECT p.* FROM properties p
       INNER JOIN favorites f ON f.property_id = p.id
       WHERE f.user_id = $1
       ORDER BY f.created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Serverfejl ved hentning af favoritter.' });
  }
});

// POST /api/favorites/:id
router.post('/:id', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const propertyId = req.params.id;
  try {
    await pool.query(
      'INSERT INTO favorites (user_id, property_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [userId, propertyId]
    );
    res.status(201).json({ message: 'Tilføjet til favoritter.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Serverfejl.' });
  }
});

// DELETE /api/favorites/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const propertyId = req.params.id;
  try {
    await pool.query(
      'DELETE FROM favorites WHERE user_id = $1 AND property_id = $2',
      [userId, propertyId]
    );
    res.json({ message: 'Fjernet fra favoritter.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Serverfejl.' });
  }
});

module.exports = router;