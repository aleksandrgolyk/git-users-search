import React, { useEffect, useRef, useState } from "react";

import { Input } from "antd";
import { useUserStore } from "store/store";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const { fetchUsers } = useUserStore();

  const debouncedFetchUsersRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    return () => {
      if (debouncedFetchUsersRef.current) {
        clearTimeout(debouncedFetchUsersRef.current);
      }
    };
  }, []);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debouncedFetchUsersRef.current) {
      clearTimeout(debouncedFetchUsersRef.current);
    }

    debouncedFetchUsersRef.current = setTimeout(() => {
      if (value.trim()) {
        // Only fetch users if value is not empty
        fetchUsers(value, 1);
      }
    }, 1000);
  };

  return (
    <Input
      placeholder="Search for GitHub users"
      value={query}
      onChange={onSearchChange}
    />
  );
};

export default UserSearch;
