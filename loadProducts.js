const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2');

const connection  = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'ecommerce'
});

fs.createReadStream('products.csv').pipe(csv()).on('data', (row) => {
    const {id, cost, category, name, brand, retail_price, department, sku, distribution_center_id} = row;
    const query =  `INSERT INTO products (id, cost, category, name, brand, retail_price, department, sku, distribution_center_id) VALUES (?,?,?,?,?,?,?,?,? )`;
    connection.query(query, [id, cost, category, name, brand, retail_price, department, sku, distribution_center_id], (err) => {
        if(err) console.error('Insert Error: ', err.message);
    });
})
.on('end', () => {
    console.log('CSV import completed successfully');
    connection.end();
});