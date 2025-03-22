import type { User } from '@/types/User'
import type { RouteRecordRaw } from 'vue-router'
import apiFetch from '@/lib/ofetch'
import LoginPage from '@/views/auth/LoginPage.vue'
import SignupPage from '@/views/auth/SignupPage.vue'
import ContentPage from '@/views/ContentsPage.vue'
import { Preferences } from '@capacitor/preferences'
import { createRouter, createWebHistory } from '@ionic/vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/contents',
  },
  {
    path: '/contents',
    component: ContentPage,
  },
  {
    path: '/modules/:moduleId/contents/:contentId',
    component: () => import('@/views/DetailContent.vue'),
  },
  {
    path: '/auth/login',
    component: LoginPage,
  },
  {
    path: '/auth/signup',
    component: SignupPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const token = await Preferences.get({ key: 'token' })

  if (!token.value) {
    if (!to.path.startsWith('/auth')) {
      return { path: '/auth/login' }
    }
  }
  else {
    try {
      const { user } = await apiFetch<{ user: User }>('/auth/verify', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      if (to.path.startsWith('/auth') && user) {
        return { path: '/contents' }
      }
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      if (!to.path.startsWith('/auth')) {
        return {
          path: '/auth/login',
        }
      }
    }
  }
})

export default router
