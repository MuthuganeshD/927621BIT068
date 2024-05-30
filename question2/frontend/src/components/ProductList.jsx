import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, TextField, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [availability, setAvailability] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [category, company, rating, priceRange, availability, sort]);

  const fetchProducts = () => {
    axios.get('/api/products', {
      params: {
        category,
        company,
        rating,
        priceRange,
        availability,
        sort,
      }
    })
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching the products:', error);
      });
  };

  return (
    <div>
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="Electronics">Electronics</MenuItem>
          <MenuItem value="Fashion">Fashion</MenuItem>
          <MenuItem value="Home">Home</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Company</InputLabel>
        <Select value={company} onChange={(e) => setCompany(e.target.value)}>
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="Company A">Company A</MenuItem>
          <MenuItem value="Company B">Company B</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField label="Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField label="Price Range" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Availability</InputLabel>
        <Select value={availability} onChange={(e) => setAvailability(e.target.value)}>
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value={true}>In stock</MenuItem>
          <MenuItem value={false}>Out of stock</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Sort By</InputLabel>
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="discount">Discount</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={fetchProducts} variant="contained" color="primary">Apply Filters</Button>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
