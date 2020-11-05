import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Item = ({ item }) => {
  const [name, setName] = useState(item.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditItem = async () => {
    const body = { name };
    await fetch(`http://localhost:5000/items/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).catch((err) => console.error(err.message));
    setIsEditing(false);
  };

  return (
    <>
      <input
        disabled={!isEditing}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {isEditing ? (
        (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleEditItem();
            }}
          >
            Save
          </button>
        )
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      )}

      <button type="button">Delete</button>
    </>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Item;
