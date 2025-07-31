import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function ProductList() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/products')
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product List</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {product.map(product => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <h4>{product.name}</h4>
            <p>₹{product.retail_price}</p>
            <Link to={`/product/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;