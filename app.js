const express = require('express');
const cors = require('cors');
const app = express();
const productsRoutes = require('./routes/products');

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/', (req,res) => {
    res.send('API is working');
});