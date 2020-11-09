import React from 'react';
import Items from './components/Items';
import NewItem from './components/NewItem';
import './App.css';

const App = () => (
  <div className="inventory">
    <h1>Inventory</h1>
    <NewItem />
    <Items />
  </div>
);

export default App;
