import React from 'react';
import './SearchItem.css';

const SearchItem = () => {
  console.log('Hello');

  return (
    <div className="search-item">
      <input
        name="search"
        type="text"
        value=""
      />
      <button type="submit">search</button>
    </div>
  );
};

export default SearchItem;
