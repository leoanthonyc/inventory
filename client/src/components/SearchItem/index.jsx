import React, { useState } from 'react';
import './SearchItem.css';

const SearchItem = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="search-item">
      <input
        name="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search here"
      />
    </div>
  );
};

export default SearchItem;
