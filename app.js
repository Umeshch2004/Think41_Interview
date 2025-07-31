const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/products');
const departmentRoutes = require('./routes/departments');

app.use('/api/products', productRoutes);
app.use('/api/departments', departmentRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});