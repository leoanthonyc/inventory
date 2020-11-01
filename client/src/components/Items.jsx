import React, { useEffect, useState } from 'react';

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
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Items;
