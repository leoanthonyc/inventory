import React from "react";
import PropTypes from "prop-types";
import "./SearchItem.css";

interface SearchItemProps {
  query: string,
  setQuery: Function,
}

const SearchItem = ({ query, setQuery }: SearchItemProps) => (
  <div className="search-item">
    Search:
    <input
      name="search"
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  </div>
);

SearchItem.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default SearchItem;
