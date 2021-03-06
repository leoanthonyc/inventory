import React, { useState } from "react";
import Items from "./components/Items";
import NewItem from "./components/NewItem";
import SearchItem from "./components/SearchItem";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="inventory">
      <h1>Inventory</h1>
      <div className="inventory-header">
        <NewItem />
        <SearchItem query={query} setQuery={setQuery} />
      </div>
      <Items query={query} />
    </div>
  );
};

export default App;
