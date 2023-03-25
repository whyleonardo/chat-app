'use client'

import { useAuth } from '@/providers/AuthProvider'
import clsx from 'clsx'

export const SignInButton = ({ isMenuButton }: { isMenuButton?: boolean }) => {
	const { login, logout, currentUser } = useAuth()

	return (
		<button
			className={clsx('btn', isMenuButton && 'btn-menu')}
			onClick={!currentUser ? login : logout}
		>
			{!currentUser ? 'Sign In' : 'Sign Out'}
		</button>
	)
}
