import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [category, setCategory] = useState('Laptop');
  const [n, setN] = useState(10);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sort, setSort] = useState('price');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);

  return (
    <div className="bg-stone-800">
      <header className="bg-stone-800">
        <h1 className=''>Top Products</h1>
        <form>
          <div>
            <label>Category:</label>
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
          </div>
          <div>
            <label>Number of Products:</label>
            <input type="number" value={n} onChange={e => setN(e.target.value)} />
          </div>
          <div>
            <label>Min Price:</label>
            <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
          </div>
          <div>
            <label>Max Price:</label>
            <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
          </div>
          <div>
            <label>Sort By:</label>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="company">Company</option>
              <option value="discount">Discount</option>
            </select>
          </div>
          <div>
            <label>Order:</label>
            <select value={order} onChange={e => setOrder(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div>
            <label>Page:</label>
            <input type="number" value={page} onChange={e => setPage(e.target.value)} />
          </div>
        </form>
        <ProductList
          category={category}
          n={n}
          minPrice={minPrice}
          maxPrice={maxPrice}
          sort={sort}
          order={order}
          page={page}
        />
      </header>
    </div>
  );
}

export default App;
