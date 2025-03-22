import type { User } from '../types/User'
import { createFileRoute, Outlet, redirect, useMatchRoute } from '@tanstack/react-router'
import SidebarLeft from '../components/SidebarLeft'
import SidebarRight from '../components/SidebarRight'
import Topbar from '../components/Topbar'
import apiFetch from '../lib/ofetch'
import { useUserStore } from '../stores/user-store'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      throw redirect({
        to: '/auth/login',
      })
    }
    const { user } = await apiFetch<{ user: User }>('/auth/verify', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!user) {
      throw redirect({
        to: '/auth/login',
      })
    }

    useUserStore.setState({ user })
  },
})

function RouteComponent() {
  const matchRoute = useMatchRoute()
  const params = matchRoute({
    to: '/dashboard/modules/$moduleId/$contentId',
  })

  if (params) {
    return (
      <div className="">
        <div className="w-5/12 mx-auto min-h-screen py-10">
          <Outlet />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen gap-8">
      <SidebarLeft />
      <div className="w-10/12 flex gap-4 overflow-y-auto">
        <div className="w-9/12 min-h-screen">
          <Topbar />
          <div className="">
            <Outlet />
          </div>
        </div>
        <SidebarRight />
      </div>
    </div>
  )
}
