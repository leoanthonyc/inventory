import React from 'react';
import Items from './components/Items';
import NewItem from './components/NewItem';
import SearchItem from './components/SearchItem';
import './App.css';

const App = () => (
  <div className="inventory">
    <h1>Inventory</h1>
    <SearchItem />
    <NewItem />
    <Items />
  </div>
);

export default App;
