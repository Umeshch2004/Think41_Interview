const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const sql = `
    SELECT d.id, d.name, COUNT(p.id) AS product_count
    FROM departments d
    LEFT JOIN products p ON d.id = p.department_id
    GROUP BY d.id, d.name
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ departments: results });
  });
});

router.get('/:id', (req, res) => {
  const sql = `SELECT id, name FROM departments WHERE id = ?`;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Department not found' });
    res.json(results[0]);
  });
});

router.get('/:id/products', (req, res) => {
  const sql = `
    SELECT 
      p.id, p.name, p.retail_price, d.name AS department
    FROM 
      products p
    LEFT JOIN 
      departments d ON p.department_id = d.id
    WHERE 
      d.id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'No products found in this department' });
    res.json({
      department: results[0].department,
      products: results.map(({ department, ...p }) => p) // remove duplicate department string from each product
    });
  });
});

module.exports = router;