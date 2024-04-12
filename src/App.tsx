import React, { useCallback, useEffect, useState } from "react";
import { UserSearch, UsersList } from "domains/User/components";

import { Input } from "antd";
import debounce from "lodash/debounce";
import { useUserStore } from "./store/store";

const App: React.FC = () => {
  const { setQuery, fetchUsers, setUsers } = useUserStore();
  const [inputValue, setInputValue] = useState("");

  const debouncedFetch = useCallback(
    debounce((value: string) => {
      if (value.trim()) {
        setQuery(value);
        fetchUsers(value);
      }
    }, 800),
    [setQuery, fetchUsers]
  );

  useEffect(() => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      setQuery(trimmedValue);
      debouncedFetch(trimmedValue);
    } else {
      // Clear the query state and the user list when input is empty
      setQuery("");
      setUsers([]); // Assuming you have a method to clear users in your store
    }
  }, [inputValue, setQuery, fetchUsers, setUsers, debouncedFetch]);
  return (
    <div>
      <Input
        placeholder="Search GitHub Users"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <UsersList />
    </div>
  );
};

export default App;

// import "./styles/App.css";

// import { UserSearch, UsersList } from "domains/User/components";

// function App() {
//   return (
//     <div className="App">
//       <UserSearch />
//       <UsersList />
//     </div>
//   );
// }

// export default App;
