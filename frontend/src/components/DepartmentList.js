import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/departments')
      .then(res => {
        console.log("✅ Received:", res.data);
        if (res.data.departments) {
          setDepartments(res.data.departments);
        } else {
          setDepartments([]); // fallback
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ API Error:", err);
        setDepartments([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Departments</h2>

      {departments.length === 0 ? (
        <p>No departments found.</p>
      ) : (
        <ul>
          {departments.map(dept => (
            <li key={dept.id}>
              <Link to={`/departments/${dept.id}`}>
                {dept.name} ({dept.product_count} products)
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link to="/">← Back to All Products</Link>
    </div>
  );
}

export default DepartmentList;