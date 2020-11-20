import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { compact, flatten, uniq } from "underscore";
import Item from "../Item";
import "./Items.css";

const SERVER_URL = "http://localhost:5000";

const Items = ({ query }) => {
  const [items, setItems] = useState([]);
  const [years, setYears] = useState([]);
  const [tags, setTags] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchItems = async () => {
    const sql =
      query.length > 0 ? `${SERVER_URL}/items/${query}` : `${SERVER_URL}/items`;
    const response = await fetch(sql);
    const data = await response.json();
    setItems(data);
    const uniqueTags = compact(
      uniq(flatten(data.map((d) => d.tags?.split(","))))
    ).sort();
    setTags(uniqueTags);
    const addedDates = compact(
      uniq(
        data.map((d) => {
          if (d.added_at) return new Date(d.added_at).getFullYear();
          return null;
        })
      )
    );
    setYears(addedDates);
  };

  const fetchItemsByYear = async (year) => {
    const response = await fetch(`${SERVER_URL}/items/year/${year}`);
    const data = await response.json();
    setItems(data);
  };

  const fetchItemsByTag = async (tag) => {
    const response = await fetch(`${SERVER_URL}/items/tag/${tag}`);
    const data = await response.json();
    setItems(data);
  };

  const handleRemoveItem = (item) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  const handleChangeYear = (year) => {
    setFilter(year);
    if (year === "all") {
      fetchItems();
    } else {
      fetchItemsByYear(year);
    }
  };

  const handleChangeTag = (tag) => {
    setFilter(tag);
    fetchItemsByTag(tag);
  };

  useEffect(() => fetchItems(), [query]);
  useEffect(() => {
    if (query.length > 0) setFilter("all");
  }, [query]);

  return (
    <div className="items">
      {query.length === 0 && (
        <div className="filters">
          <span>
            <button
              type="button"
              onClick={() => handleChangeYear("all")}
              disabled={filter === "all"}
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
                {year === "notdated" ? "Not dated" : year}
              </button>
            </span>
          ))}
          {tags.map((tag) => (
            <span key={tag}>
              <button
                disabled={filter === tag}
                type="button"
                onClick={() => handleChangeTag(tag)}
              >
                {tag}
              </button>
            </span>
          ))}
        </div>
      )}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Item item={item} handleRemoveItem={handleRemoveItem} />
          </li>
        ))}
      </ul>
    </div>
  );
};

Items.propTypes = {
  query: PropTypes.string.isRequired,
};

export default Items;
