'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '../stores/authStore.js'

export default function ProtectedRoute({ children }) {
  const { token } = useAuthStore()
  const router = useRouter()
  
  useEffect(() => {
    if (!token) {
      router.push('/auth/login')
    }
  }, [token, router])
  
  return token ? children : null
}
