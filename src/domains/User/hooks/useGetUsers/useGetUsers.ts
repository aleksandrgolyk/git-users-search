import { useEffect, useState } from "react";

import debounce from "lodash/debounce";
import { useUserStore } from "store/store";

const useGetUsers = (delay: number = 800) => {
  const [inputValue, setInputValue] = useState("");
  const { setQuery, fetchUsers, setUsers } = useUserStore();

  useEffect(() => {
    const debouncedSearch = debounce(async (value: string) => {
      if (value.trim()) {
        setQuery(value);
        try {
          await fetchUsers(value);
        } catch (error) {
          console.error("Failed to fetch users:", error);
          setUsers([]);
        }
      } else {
        setUsers([]);
        setQuery("");
      }
    }, delay);

    debouncedSearch(inputValue);

    return () => {
      debouncedSearch.cancel(); // Cleanup on unmount or inputValue change
    };
  }, [inputValue, setQuery, fetchUsers, setUsers, delay]);

  return { inputValue, setInputValue };
};

export default useGetUsers;
