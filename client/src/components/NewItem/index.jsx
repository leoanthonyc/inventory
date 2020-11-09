import React, { useState } from 'react';
import './NewItem.css';

const NewItem = () => {
  const [name, setName] = useState('');
  const [dateAdded, setDateAdded] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }
    const body = { name, dateAdded };
    await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(() => { window.location = '/'; }).catch((err) => console.error(err.message));
  };

  return (
    <div className="new-item">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="dateadded">
          Date added
          <input
            name="dateadded"
            type="date"
            value={dateAdded}
            onChange={(e) => setDateAdded(e.target.value)}
          />
        </label>
        <button
          disabled={name.length < 1}
          className="save"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NewItem;
