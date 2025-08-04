import { create } from 'zustand';
import { ManageUser } from '@/types/login';

interface UserState {
  user: ManageUser | null;
  setUser: (user: ManageUser) => void;
}

export const useUser = create<UserState>(set => {
  return {
    user: null,
    setUser: user => {
      set({ user });
    },
  };
});
