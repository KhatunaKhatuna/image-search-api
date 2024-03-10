import React, { useState } from "react";

const Search = ({ onInputChange }: any) => {
  const [query, setQuery] = useState("");
  const pattern = /[^a-zA-Z]/g;
  const handleChange = (e: any) => {
    setQuery(e.target.value.replace(pattern, ""));
    onInputChange(e.target.value.replace(pattern, ""));
  };
  const handleClick = () => {
    setQuery("");
    onInputChange("");
  };

  return (
    <div className="search">
      <input
        type="search"
        placeholder="Search ..."
        value={query}
        onChange={handleChange}
        onClick={handleClick}
      />
    </div>
  );
};

export default Search;
