import { useRouter } from 'next/router'
import React from 'react'
import { FullPageLoading } from '../../components/FullPageLoading'
import { useAuth } from '../auth'

export function protectedRoute(Component: any) {
  return function ProtectedRoute(props: any) {
    const { useRequiredAuth, loading } = useAuth()
    const auth = useRequiredAuth()
    const router = useRouter()

    if (typeof window !== 'undefined') {
      if (!auth && !loading) {
        router.replace('/signin')
        return <FullPageLoading />
      } else if (loading) {
        return <FullPageLoading />
      }

      return <Component {...props} />
    }

    return null
  }
}
