import React from 'react';
import Items from './components/Items';
import NewItem from './components/NewItem';

const App = () => (
  <>
    <h1>Inventory</h1>
    <NewItem />
    <Items />
  </>
);

export default App;
