const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const sql = `
    SELECT p.id, p.name, p.retail_price, d.name AS department
    FROM products p
    LEFT JOIN departments d ON p.department_id = d.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const sql = `
    SELECT p.id, p.name, p.retail_price, d.name AS department
    FROM products p
    LEFT JOIN departments d ON p.department_id = d.id
    WHERE p.id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(results[0]);
  });
});
module.exports = router;