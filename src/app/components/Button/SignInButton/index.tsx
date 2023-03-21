'use client'

import { useAuth } from '@/providers/AuthProvider'

export const SignInButton = () => {
	const { login, logout, currentUser } = useAuth()

	return (
		<button className="bg-red-500" onClick={!currentUser ? login : logout}>
			{!currentUser ? 'Sign In' : 'Sign Out'}
		</button>
	)
}
