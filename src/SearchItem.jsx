import React from "react";

const SearchItem = ({ search, setSearch }) => {
  return (
    <form className="mb-3" onSubmit={(e) => e.preventDefault()}>
      {/* <label htmlFor="search">Search the items</label> */}
      <input
        type="text"
        id="search"
        placeholder="Search Items"
        className="bg-[#00000070]  block bg-white w-full p-3 rounded-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
