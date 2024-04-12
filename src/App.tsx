import React, { useCallback, useEffect, useState } from "react";

import { Input } from "antd";
import { UsersList } from "domains/User/components";
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  useEffect(() => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      setQuery(trimmedValue);
      debouncedFetch(trimmedValue);
    } else {
      // Clear the query state and the user list when input is empty
      setQuery("");
      setUsers([]);
    }
  }, [inputValue, setQuery, fetchUsers, setUsers, debouncedFetch]);
  return (
    <div>
      <Input
        placeholder="Search GitHub Users"
        value={inputValue}
        onChange={handleInputChange}
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
