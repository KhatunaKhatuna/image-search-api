import { useState } from "react";

useState;

export default function Search({ handleChange, query }: any) {
  return (
    <div className="search">
      <input
        value={query}
        onChange={handleChange}
        type="search"
        placeholder="Search ..."
      />
    </div>
  );
}
