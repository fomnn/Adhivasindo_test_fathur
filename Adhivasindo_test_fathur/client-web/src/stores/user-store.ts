import type { User } from '../types/User'
import { create } from 'zustand'

export const useUserStore = create<{ user: User | null }>(set => ({
  user: null,
  setUser: (user: User) => set({ user }),
  removeUser: () => set({ user: null }),
}))
