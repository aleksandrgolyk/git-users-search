import { create } from "zustand";
interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  company?: string;
  email?: string;
  blog?: string;
}
interface UserStoreState {
  users: GitHubUser[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: (query: string) => void;
}

const useUserStore = create<UserStoreState>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  fetchUsers: async (query: string) => {
    if (query.trim() === "") {
      set({ users: [] });
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}&per_page=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      set({ users: data.items, isLoading: false });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unexpected error occurred", isLoading: false });
      }
    }
  },
}));

export default useUserStore;
