import React, { useState } from 'react';
import Items from './components/Items';
import NewItem from './components/NewItem';
import SearchItem from './components/SearchItem';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="inventory">
      <h1>Inventory</h1>
      <SearchItem query={query} setQuery={setQuery} />
      <NewItem />
      <Items query={query} />
    </div>
  );
};

export default App;
