import type { User } from '@/types/User'
import apiFetch from '@/lib/ofetch'
import { Preferences } from '@capacitor/preferences'
import { useMutation, useQuery } from '@tanstack/vue-query'

export function useLogin() {
  return useMutation({
    mutationFn: async (data: { email: string, password: string }) => {
      const { token } = await apiFetch<{ token: string, user: User }>('/auth/login', {
        method: 'POST',
        body: data,
      })

      if (token) {
        await Preferences.set({
          key: 'token',
          value: token,
        })
      }
    },
  })
}

export function useSignup() {
  return useMutation({
    mutationFn: async (data: { email: string, password: string, name: string }) => {
      const { token, user } = await apiFetch<{ token: string, user: User }>('/auth/signup', {
        method: 'POST',
        body: data,
      })
      if (token) {
        await Preferences.set({
          key: 'token',
          value: token,
        })
      }

      return {
        token,
        user,
      }
    },
  })
}
