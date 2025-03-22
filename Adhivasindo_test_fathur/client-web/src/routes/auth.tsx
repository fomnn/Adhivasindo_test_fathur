import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import apiFetch from '../lib/ofetch'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
  beforeLoad: async () => {
    const token = localStorage.getItem('token')
    if (token) {
      const { user } = await apiFetch<{ user: object }>('/auth/verify', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (user) {
        throw redirect({
          to: '/dashboard',
        })
      }
      else {
        localStorage.removeItem('token')
      }
    }
  },
})

function RouteComponent() {
  return <Outlet />
}
