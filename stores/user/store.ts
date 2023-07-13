import { create } from 'zustand';

/* ============================================================================
= Types =======================================================================
============================================================================ */

export type UserState = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

type UserStoreActions = {
  reset: () => void;
  update: (args: Partial<UserState>) => void;
};

export type UserStore = UserState & UserStoreActions;

/* ============================================================================
= Initial State ===============================================================
============================================================================ */

const initialState: UserState = {
  email: '',
  firstName: '',
  lastName: '',
  username: '',
};

/* ============================================================================
= Store =======================================================================
============================================================================ */

export const useUserStore = create<UserStore>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  update: (data) => set({ ...data }),
}));
