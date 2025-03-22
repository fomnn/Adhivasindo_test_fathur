import type { User } from '../types/User'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import apiFetch from '../lib/ofetch'
import { useUserStore } from '../stores/user-store'

export function useLogin() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (body: { email: string, password: string }) => {
      const { token, user } = await apiFetch<{ token: string, user: User }>('/auth/login', {
        method: 'POST',
        body,
      })

      if (token) {
        useUserStore.setState({ user })

        localStorage.setItem('token', token)
        return navigate({
          to: '/dashboard',
        })
      }
    },
  })
}

export function useSignup() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (body: { email: string, password: string, name: string }) => {
      const { token, user } = await apiFetch<{ token: string, user: User }>('/auth/signup', {
        method: 'POST',
        body,
      })

      if (token) {
        localStorage.setItem('token', token)
        useUserStore.setState({ user })
        return navigate({
          to: '/dashboard',
        })
      }
    },
  })
}

export function useLogout() {
  const navigate = useNavigate()

  return () => {
    useUserStore.setState({ user: null })
    localStorage.removeItem('token')
    navigate({
      to: '/auth/login',
    })
  }
}

