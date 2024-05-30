import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList({ category, n, minPrice, maxPrice, sort, order, page }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/categories/${category}/products`, {
          params: {
            n,
            minPrice,
            maxPrice,
            sort,
            order,
            page,
          },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, n, minPrice, maxPrice, sort, order, page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Top Products in {category}</h2>
      <ul>
        {products.map(product => (
          <li key={product.customId}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Company: {product.company}</p>
            <p>Discount: {product.discount}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
