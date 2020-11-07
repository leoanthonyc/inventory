import React, { useEffect, useState } from 'react';
import Item from './Item';
import './Items.css';

const Items = () => {
  const [items, setItems] = useState([]);
  const [years, setYears] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchItems = async () => {
    const response = await fetch('http://localhost:5000/items');
    const data = await response.json();
    setItems(data);
  };

  const fetchItemsByYear = async (year) => {
    const response = await fetch(`http://localhost:5000/items/year/${year}`);
    const data = await response.json();
    setItems(data);
  };

  const fetchYears = async () => {
    const response = await fetch('http://localhost:5000/years');
    const data = await response.json();
    setYears(data.map((datePart) => datePart.date_part || 'notdated'));
  };

  const handleRemoveItem = (item) => {
    setItems(
      (prevItems) => prevItems.filter((i) => i.id !== item.id),
    );
  };

  const handleChangeYear = (year) => {
    setFilter(year);
    if (year === 'all') {
      fetchItems();
    } else {
      fetchItemsByYear(year);
    }
  };

  useEffect(() => fetchItems(), []);
  useEffect(() => fetchYears(), []);

  return (
    <>
      <h1> Items </h1>
      <div>
        <span>
          <button
            type="button"
            onClick={() => handleChangeYear('all')}
            disabled={filter === 'all'}
          >
            All
          </button>
        </span>
        {years.map((year) => (
          <span key={year}>
            <button
              disabled={filter === year}
              type="button"
              onClick={() => handleChangeYear(year)}
            >
              {year === 'notdated' ? 'Not dated' : year}
            </button>
          </span>
        ))}
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Item item={item} handleRemoveItem={handleRemoveItem} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Items;
