import { create } from "zustand";

interface User {
  id: number;
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  company?: string;
  email?: string;
  blog?: string;
}

interface UserStore {
  users: User[];
  error: string | null;
  hasMore: boolean;
  isLoading: boolean;
  query: string;
  page: number;
  setQuery: (query: string) => void;
  setUsers: (users: User[]) => void;
  fetchUsers: (query: string, page?: number) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  error: null,
  hasMore: true,
  isLoading: false,
  query: "",
  page: 1,
  setQuery: (query: string) => set({ query, page: 1 }),
  setUsers: (users: User[]) => set({ users }),
  fetchUsers: async (query: string, page: number = 1) => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`
      );
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            "You have hit GitHub's rate limit. Please wait a few seconds before trying again."
          );
        }
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      set({
        users:
          data.items.length > 0
            ? page === 1
              ? data.items
              : [...get().users, ...data.items]
            : [],
        hasMore: data.items.length === 10,
        isLoading: false,
        page: data.items.length > 0 ? page + 1 : page,
      });
    } catch (error) {
      if (error instanceof Error) {
        set({
          error: error.message,
          isLoading: false,
          users: [],
          hasMore: false,
        });
      } else {
        set({
          error: "An unexpected error occurred",
          isLoading: false,
          users: [],
          hasMore: false,
        });
      }
    }
  },
}));
