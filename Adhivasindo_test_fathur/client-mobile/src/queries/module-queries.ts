import type { Module } from '../types/Module'
import { Preferences } from '@capacitor/preferences'
import { useQuery } from '@tanstack/vue-query'
import apiFetch from '../lib/ofetch'

export function useGetAllModules({ take }: { take?: number } = {}) {
  return useQuery({
    queryKey: ['modules', (take ? { take } : null)],
    queryFn: async () => {
      const token = await Preferences.get({ key: 'token' })
      const { modules } = await apiFetch<{ modules: Module[] }>('/modules', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        params: {
          take,
        },
      })

      return modules
    },
  })
}
