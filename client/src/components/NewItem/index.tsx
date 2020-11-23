import React, { useState } from "react";
import "./NewItem.css";

const SERVER_URL = "http://localhost:5000";

const NewItem = () => {
  const [name, setName] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }
    const body = { name, dateAdded };
    await fetch(`${SERVER_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <div className="new-item">
      <form onSubmit={handleSubmit}>
        {isEditing ? (
          <>
            <label htmlFor="name">
              Name:
              <input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="dateadded">
              Date added:
              <input
                name="dateadded"
                type="date"
                value={dateAdded}
                onChange={(e) => setDateAdded(e.target.value)}
              />
            </label>
            <button disabled={name.length < 1} className="save" type="submit">
              Save
            </button>
            <button type="submit" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>
            + New Item
          </button>
        )}
      </form>
    </div>
  );
};

export default NewItem;
