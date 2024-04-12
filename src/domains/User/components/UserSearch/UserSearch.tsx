// domains/User/components/UserSearch.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Input } from "antd";
import UserSimpleView from "../UserSimpleView";
import { debounce } from "lodash";
import { useInView } from "react-intersection-observer";
import { useUserStore } from "store/store";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const { fetchUsers } = useUserStore();

  // Create a stable debounced function using useRef and useEffect
  const debouncedFetchUsersRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    // Clear the timeout when the component unmounts
    return () => {
      if (debouncedFetchUsersRef.current) {
        clearTimeout(debouncedFetchUsersRef.current);
      }
    };
  }, []);

  // const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setQuery(value);

  //   // Clear the existing timeout
  //   if (debouncedFetchUsersRef.current) {
  //     clearTimeout(debouncedFetchUsersRef.current);
  //   }

  //   // Set up a new timeout
  //   debouncedFetchUsersRef.current = setTimeout(() => {
  //     fetchUsers(value, 1);
  //   }, 1000);
  // };
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Clear the existing timeout
    if (debouncedFetchUsersRef.current) {
      clearTimeout(debouncedFetchUsersRef.current);
    }

    // Set up a new timeout
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

// import { AutoComplete, Input } from "antd";
// import React, { useEffect } from "react";

// import UserSimpleView from "../UserSimpleView";
// import { useInView } from "react-intersection-observer";
// import { useState } from "react";
// import useUserStore from "store/store";

// const UserSearch: React.FC = () => {
//   const [query, setQuery] = useState("");
//   const { ref, inView } = useInView({
//     threshold: 0,
//   });
//   const { users, page, fetchUsers, hasMore } = useUserStore();
//   // const fetchUsers = useUserStore((state) => state.fetchUsers);

//   const handleSearch = (value: string) => {
//     setQuery(value);
//     fetchUsers(value, 1); // Reset page to 1 on new search
//   };

//   // Load more users when the last element is in view
//   useEffect(() => {
//     if (inView && hasMore && query) {
//       fetchUsers(query, page + 1);
//     }
//   }, [inView, hasMore, query, page, fetchUsers]);
//   console.log(users?.length);

//   return (
//     <AutoComplete
//       style={{ width: "100%" }}
//       onSearch={handleSearch}
//       onSelect={(value: string) => setQuery(value)}
//       options={users.map((user) => ({
//         value: user.login,
//         label: <UserSimpleView user={user} />,
//       }))}
//     >
//       <Input.Search placeholder="Search for GitHub users" />
//     </AutoComplete>
//   );
// };

// export default UserSearch;
