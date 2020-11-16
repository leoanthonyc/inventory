import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';
import './Item.css';

const Item = ({ item, handleRemoveItem }) => {
  const [name, setName] = useState(item.name);
  const [dateAdded, setDateAdded] = useState(
    item.added_at
      ? new Date(item.added_at).toISOString().split('T')[0]
      : '',
  );
  const [isEditing, setIsEditing] = useState(false);
  const [tags, setTags] = useState(item?.tags?.length > 0 ? item.tags?.split(',') : []);
  const handleEditItem = async () => {
    const body = { name, dateAdded, tags };
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

  useEffect(() => handleEditItem(), [tags]);

  return (
    <div className="item">
      {isEditing ? (
        (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEditItem();
              }}
            />
            <input
              type="date"
              value={dateAdded}
              onChange={(e) => setDateAdded(e.target.value)}
            />
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
          <div className="item-name">
            {name}
          </div>
          <div className="item-date">
            {dateAdded}
          </div>
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
      <TagsInput
        className="react-tagsinput"
        value={tags}
        onChange={(inputTags) => setTags(inputTags)}
        inputProps={{ placeholder: '+ tags' }}
      />
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.string,
    added_at: PropTypes.string,
  }).isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
};

export default Item;
