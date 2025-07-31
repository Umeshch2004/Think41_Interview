import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function DepartmentProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/departments/${id}/products`)
      .then(res => {
        setDepartment(res.data.department);
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch(() => {
        setDepartment("Not Found");
        setProducts([]);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{department}</h2>
      <p>{products.length} products</p>

      {products.length === 0 ? (
        <p>No products found in this department.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {products.map(product => (
            <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
              <h4>{product.name}</h4>
              <p>₹{product.retail_price}</p>
              <Link to={`/product/${product.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}

      <br />
      <Link to="/departments">← Back to Departments</Link> | <Link to="/">All Products</Link>
    </div>
  );
}
export default DepartmentProducts;