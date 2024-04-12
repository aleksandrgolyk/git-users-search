import React from "react";
import { useState } from "react";
import useUserStore from "store/store";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const fetchUsers = useUserStore((state) => state.fetchUsers);

  const handleSearch = () => {
    fetchUsers(query);
    console.log(query);
  };
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search for GitHub users"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default UserSearch;
