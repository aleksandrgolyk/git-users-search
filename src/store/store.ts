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
  // fetchUsers: async (query: string, page: number = 1) => {
  //   if (get().isLoading) return;
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await fetch(
  //       `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`
  //     );
  //     if (!response.ok) {
  //       if (response.status === 403) {
  //         throw new Error(
  //           "You have hit GitHub's rate limit. Please wait a few seconds before trying again."
  //         );
  //       }
  //       throw new Error("Failed to fetch");
  //     }
  //     const data = await response.json();
  //     set({
  //       users: page === 1 ? data.items : [...get().users, ...data.items],
  //       hasMore: data?.items?.length === 10,
  //       isLoading: false,
  //       page: page + 1,
  //     });
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       set({ error: error.message, isLoading: false });
  //     } else {
  //       set({ error: "An unexpected error occurred", isLoading: false });
  //     }
  //   }
  // },
  fetchUsers: async (query: string, page: number = get().page) => {
    if (get().isLoading || !get().hasMore) return; // Check if loading or no more users to fetch
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
        users: page === 1 ? data.items : [...get().users, ...data.items],
        hasMore: data.items.length === 10,
        isLoading: false,
        page: page + 1, // Move to next page only on successful fetch
      });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: "An unexpected error occurred", isLoading: false });
      }
    }
  },
}));
// import { create } from "zustand";
// interface GitHubUser {
//   id: number;
//   login: string;
//   avatar_url: string;
//   followers: number;
//   following: number;
//   company?: string;
//   email?: string;
//   blog?: string;
// }
// interface UserStoreState {
//   users: GitHubUser[];
//   isLoading: boolean;
//   error: string | null;
//   page: number;
//   hasMore: boolean;
//   fetchUsers: (query: string, page: number) => void;
// }

// const useUserStore = create<UserStoreState>((set, get) => ({
//   users: [],
//   isLoading: false,
//   error: null,
//   hasMore: true,
//   page: 1,
//   fetchUsers: async (query: string, page: number) => {
//     if (query.trim() === "") {
//       set({ users: [], page: 1, hasMore: true });
//       return;
//     }
//     // state here? check later
//     set({ isLoading: true, error: null });
//     const currentPage = get().page;
//     try {
//       const response = await fetch(
//         `https://api.github.com/search/users?q=${query}&per_page=10&page=${currentPage}`
//       );
//       if (!response.ok) {
//         if (response.status === 403) {
//           throw new Error(
//             "You have hit GitHub's rate limit. Please wait a few seconds before trying again."
//           );
//         }
//         throw new Error("Failed to fetch users");
//       }
//       const data = await response.json();
//       // set({ users: data.items, isLoading: false });
//       set((state) => ({
//         users: currentPage === 1 ? data.items : [...state.users, ...data.items],
//         isLoading: false,
//         page: state.page + 1,
//         // or >=1 ? check later
//         hasMore: data.items.length >= 10,
//       }));
//     } catch (error) {
//       if (error instanceof Error) {
//         set({ error: error.message, isLoading: false });
//       } else {
//         set({ error: "An unexpected error occurred", isLoading: false });
//       }
//     }
//   },
// }));

// export default useUserStore;