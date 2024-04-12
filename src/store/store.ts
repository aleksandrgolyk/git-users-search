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
  page: number;
  hasMore: boolean;
  fetchUsers: (query: string, page: number) => void;
}

const useUserStore = create<UserStoreState>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  hasMore: true,
  page: 1,
  fetchUsers: async (query: string, page: number) => {
    if (query.trim() === "") {
      set({ users: [], page: 1, hasMore: true });
      return;
    }
    // state here? check later
    set({ isLoading: true, error: null });
    const currentPage = get().page;
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}&per_page=10&page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      // set({ users: data.items, isLoading: false });
      set((state) => ({
        users: currentPage === 1 ? data.items : [...state.users, ...data.items],
        isLoading: false,
        page: state.page + 1,
        // or >=1 ? check later
        hasMore: data.items.length >= 10,
      }));
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
