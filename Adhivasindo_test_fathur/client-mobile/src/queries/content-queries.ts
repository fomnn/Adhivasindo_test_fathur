import type { Ref } from 'vue'
import type { Content } from '../types/Content'
import { Preferences } from '@capacitor/preferences'
import { useQuery } from '@tanstack/vue-query'
import apiFetch from '../lib/ofetch'

export function useGetContentsByModuleId(moduleId: string, { take }: { take?: number } = {}) {
  return useQuery({
    queryKey: ['modules', moduleId, 'contents', (take ? { take } : null)],
    queryFn: async () => {
      const token = await Preferences.get({ key: 'token' })

      const { contents } = await apiFetch<{ contents: Content[] }>(`/modules/${moduleId}/contents`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
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
      const token = await Preferences.get({ key: 'token' })

      const { content } = await apiFetch<{ content: Content }>(`/modules/${moduleId}/contents/${contentId}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      return content
    },
  })
}
