'use client'

import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@chakra-ui/react'

export const SignInButton = () => {
	const { login, logout, currentUser } = useAuth()

	return (
		<Button onClick={!currentUser ? login : logout}>
			{!currentUser ? 'Sign In' : 'Sign Out'}
		</Button>
	)
}
