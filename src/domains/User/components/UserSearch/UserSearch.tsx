import { AutoComplete, Input } from "antd";
import React, { useEffect } from "react";

import UserSimpleView from "../UserSimpleView";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import useUserStore from "store/store";

const UserSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { users, page, fetchUsers, hasMore } = useUserStore();
  // const fetchUsers = useUserStore((state) => state.fetchUsers);

  const handleSearch = (value: string) => {
    setQuery(value);
    fetchUsers(value, 1); // Reset page to 1 on new search
  };

  // Load more users when the last element is in view
  useEffect(() => {
    if (inView && hasMore && query) {
      fetchUsers(query, page + 1);
    }
  }, [inView, hasMore, query, page, fetchUsers]);

  return (
    <AutoComplete
      style={{ width: "100%" }}
      onSearch={handleSearch}
      onSelect={(value: string) => setQuery(value)}
      options={users.map((user) => ({
        value: user.login,
        label: <UserSimpleView user={user} />,
      }))}
    >
      <Input.Search placeholder="Search for GitHub users" />
    </AutoComplete>
    // <div className="App">
    //   <input
    //     type="text"
    //     placeholder="Search for GitHub users"
    //     onChange={(e) => setQuery(e.target.value)}
    //   />
    //   <button onClick={handleSearch}>Search</button>
    // </div>
  );
};

export default UserSearch;
