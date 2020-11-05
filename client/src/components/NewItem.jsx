import React, { useState } from 'react';

const NewItem = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }
    const body = { name };
    await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(() => { window.location = '/'; }).catch((err) => console.error(err.message));
  };

  return (
    <>
      <h1> New Item </h1>
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
        <button
          disabled={name.length < 1}
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default NewItem;
