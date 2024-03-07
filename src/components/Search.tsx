import { useState } from "react";

useState;

export default function Search({ handleChange, query, setQuery }: any) {
  return (
    <div className="search">
      <input
        value={query}
        onChange={handleChange}
        type="search"
        placeholder="Search ..."
        onClick={() => setQuery("")}
      />
    </div>
  );
}
