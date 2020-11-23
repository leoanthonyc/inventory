import React, { useEffect, useState } from "react";
import { compact, flatten, uniq } from "underscore";
import Item from "../Item";
import "./Items.css";

const SERVER_URL = "http://localhost:5000";

interface IItem {
  id: number,
  name: string,
  tags?: string,
  added_at?: string,
}

interface ItemsProps {
  query: string
}

const Items = ({ query }: ItemsProps) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");

  const fetchItems = async () => {
    const sql =
      query.length > 0 ? `${SERVER_URL}/items/${query}` : `${SERVER_URL}/items`;
    const response = await fetch(sql);
    const data = await response.json();
    setItems(data);
    const uniqueTags = compact(
      uniq(flatten(data.map((d: IItem) => d.tags?.split(","))))
    ).sort();
    setTags(uniqueTags);
    const addedDates = compact(
      uniq(
        data.map((d: IItem) => {
          if (d.added_at) return new Date(d.added_at).getFullYear();
          return null;
        })
      )
    );
    setYears(addedDates);
  };

  const fetchItemsByYear = async (year: String) => {
    const response = await fetch(`${SERVER_URL}/items/year/${year}`);
    const data = await response.json();
    setItems(data);
  };

  const fetchItemsByTag = async (tag: string) => {
    const response = await fetch(`${SERVER_URL}/items/tag/${tag}`);
    const data = await response.json();
    setItems(data);
  };

  const handleRemoveItem = (item: IItem) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  const handleChangeYear = (year: string) => {
    setFilter(year);
    if (year === "all") {
      fetchItems();
    } else {
      fetchItemsByYear(year);
    }
  };

  const handleChangeTag = (tag: string) => {
    setFilter(tag);
    fetchItemsByTag(tag);
  };

  useEffect(() => { fetchItems() }, [query]);
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

export default Items;
