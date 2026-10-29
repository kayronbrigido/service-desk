'use client'

import { Routes } from '@src/config/routes'
import { useRouter } from 'next/navigation'


export function useNavigation() {
  const router = useRouter()

  return {
    navigationService: {
      goHome: () => router.push(Routes.Home),
      navigateTo: (route: string) => router.push(route),
      replace: (route: string) => router.replace(route)
    }
  }
}