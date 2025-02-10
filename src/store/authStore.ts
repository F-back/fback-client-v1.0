import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  user?: {
    id: string;
    email: string;
    name: string;
  };
  accessToken?: string;
  addUser: (user: { id: string; email: string; name: string }) => void;
  addAccessToken: (accessToken: string) => void;
  deleteAccessToken: () => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      // state
      user: undefined,
      accessToken: undefined,
      // actions
      addUser: (user: { id: string; email: string; name: string }) =>
        set({ user }),
      addAccessToken: (accessToken: string) => set({ accessToken }),
      deleteAccessToken: () => set({ user: undefined, accessToken: undefined }),
    }),
    {
      name: 'user-storage',
    }
  )
);
