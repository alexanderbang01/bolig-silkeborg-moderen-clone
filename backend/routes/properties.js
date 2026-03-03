const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// GET /api/properties
router.get('/', async (req, res) => {
  const {
    type,
    area,
    min_rooms,
    max_rooms,
    min_size,
    max_size,
    max_price,
    dog_allowed,
    cat_allowed,
    balcony,
    elevator,
    parking,
    washing_machine,
    ev_charging,
    available_from,
  } = req.query;

  let conditions = [];
  let values = [];
  let idx = 1;

  if (type) {
    conditions.push(`type = $${idx++}`);
    values.push(type);
  }
  if (area) {
    conditions.push(`area = $${idx++}`);
    values.push(area);
  }
  if (min_rooms) {
    conditions.push(`rooms >= $${idx++}`);
    values.push(parseInt(min_rooms));
  }
  if (max_rooms) {
    conditions.push(`rooms <= $${idx++}`);
    values.push(parseInt(max_rooms));
  }
  if (min_size) {
    conditions.push(`size >= $${idx++}`);
    values.push(parseInt(min_size));
  }
  if (max_size) {
    conditions.push(`size <= $${idx++}`);
    values.push(parseInt(max_size));
  }
  if (max_price) {
    conditions.push(`price <= $${idx++}`);
    values.push(parseInt(max_price));
  }
  if (dog_allowed === 'true') {
    conditions.push(`dog_allowed = TRUE`);
  }
  if (cat_allowed === 'true') {
    conditions.push(`cat_allowed = TRUE`);
  }
  if (balcony === 'true') {
    conditions.push(`balcony = TRUE`);
  }
  if (elevator === 'true') {
    conditions.push(`elevator = TRUE`);
  }
  if (parking === 'true') {
    conditions.push(`parking = TRUE`);
  }
  if (washing_machine === 'true') {
    conditions.push(`washing_machine = TRUE`);
  }
  if (ev_charging === 'true') {
    conditions.push(`ev_charging = TRUE`);
  }
  if (available_from) {
    conditions.push(`available_from <= $${idx++}`);
    values.push(available_from);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `SELECT * FROM properties ${where} ORDER BY created_at DESC`;

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Serverfejl ved hentning af boliger.' });
  }
});

// GET /api/properties/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM properties WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Bolig ikke fundet.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Serverfejl.' });
  }
});

module.exports = router;