import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Item.css';

const Item = ({ item, handleRemoveItem }) => {
  const [name, setName] = useState(item.name);
  const [dateAdded, setDateAdded] = useState(
    item.added_at
      ? new Date(item.added_at).toISOString().split('T')[0]
      : '',
  );
  const [isEditing, setIsEditing] = useState(false);
  const handleEditItem = async () => {
    const body = { name, dateAdded };
    await fetch(`http://localhost:5000/items/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).catch((err) => console.error(err.message));
    setIsEditing(false);
  };

  const handleDeleteItem = async () => {
    if (window.confirm('Are you sure?')) {
      const response = await fetch(`http://localhost:5000/items/${item.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        handleRemoveItem(item);
      }
    }
  };

  return (
    <div className="item">
      <input
        disabled={!isEditing}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleEditItem();
        }}
      />
      <input
        disabled={!isEditing}
        type="date"
        value={dateAdded}
        onChange={(e) => setDateAdded(e.target.value)}
      />
      {isEditing ? (
        (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleEditItem();
              }}
            >
              save
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(false);
              }}
            >
              cancel
            </button>
          </>
        )
      ) : (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
            }}
          >
            edit
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteItem();
            }}
          >
            delete
          </button>
        </>
      )}
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    added_at: PropTypes.string,
  }).isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
};

export default Item;
