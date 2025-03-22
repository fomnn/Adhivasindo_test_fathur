import type { Module } from '../types/Module'
import { useQuery } from '@tanstack/react-query'
import apiFetch from '../lib/ofetch'

export function useGetAllModules({ take }: { take?: number } = {}) {
  return useQuery({
    queryKey: ['modules', (take ? { take } : null)],
    queryFn: async () => {
      const { modules } = await apiFetch<{ modules: Module[] }>('/modules', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          take,
        },
      })

      return modules
    },
  })
}
