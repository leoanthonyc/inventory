import React, { useEffect, useState } from 'react';
import Item from './Item';

const Items = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await fetch('http://localhost:5000/items');
    const data = await response.json();
    setItems(data);
  };

  useEffect(() => fetchItems(), []);

  return (
    <>
      <h1> Items </h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Item item={item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Items;
