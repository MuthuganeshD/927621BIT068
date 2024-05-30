const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = 'http://20.244.56.144/test';

const COMPANIES = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

const fetchProductsFromCompany = async (company, category, minPrice, maxPrice, top) => {
  const url = `${BASE_URL}/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  const response = await axios.get(url);
  return response.data;
};

app.get('/categories/:categoryname/products', async (req, res) => {
  try {
    const { categoryname } = req.params;
    const { n, minPrice, maxPrice, sort, order, page = 1 } = req.query;

    if (n > 10) {
      return res.status(400).json({ error: "Maximum 10 products per page allowed. Use pagination." });
    }

    const fetchPromises = COMPANIES.map(company => 
      fetchProductsFromCompany(company, categoryname, minPrice, maxPrice, n)
    );

    const results = await Promise.all(fetchPromises);
    let products = results.flat();

    if (sort) {
      products.sort((a, b) => {
        if (order === 'asc') {
          return a[sort] - b[sort];
        } else {
          return b[sort] - a[sort];
        }
      });
    }

    const startIndex = (page - 1) * n;
    const endIndex = startIndex + Number(n);
    const paginatedProducts = products.slice(startIndex, endIndex);

    paginatedProducts.forEach(product => {
      product.customId = `${product.id}-${categoryname}-${product.company}`;
    });

    res.json(paginatedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/categories/:categoryname/products/:productid', async (req, res) => {
  try {
    const { categoryname, productid } = req.params;
    const [originalId, company] = productid.split('-').slice(-2);

    const url = `${BASE_URL}/companies/${company}/categories/${categoryname}/products/${originalId}`;
    const response = await axios.get(url);
    const product = response.data;
    
    product.customId = productid;
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
