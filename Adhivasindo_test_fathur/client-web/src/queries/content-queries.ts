import type { Content } from '../types/Content'
import { useQuery } from '@tanstack/react-query'
import apiFetch from '../lib/ofetch'

export function useGetContentsByModuleId(moduleId: string, { take }: { take?: number } = {}) {
  return useQuery({
    queryKey: ['modules', moduleId, 'contents', (take ? { take } : null)],
    queryFn: async () => {
      const { contents } = await apiFetch<{ contents: Content[] }>(`/modules/${moduleId}/contents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          take,
        },
      })
      return contents
    },
  })
}

export function useGetContentById(moduleId: string, contentId: string) {
  return useQuery({
    queryKey: ['modules', moduleId, 'contents', contentId],
    queryFn: async () => {
      const { content } = await apiFetch<{ content: Content }>(`/modules/${moduleId}/contents/${contentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      return content
    },
  })
}
