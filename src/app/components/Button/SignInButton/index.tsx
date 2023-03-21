'use client'

import { useAuth } from '@/providers/AuthProvider'
import clsx from 'clsx'

export const SignInButton = ({ isMenuButton }: { isMenuButton?: boolean }) => {
	const { login, logout, currentUser } = useAuth()

	return (
		<button
			className={clsx(
				'text-black dark:text-white transition duration-150 hover:text-black/50 dark:hover:text-white/50',
				isMenuButton && 'hover:text-white/50 dark:hover:text-white/50'
			)}
			onClick={!currentUser ? login : logout}
		>
			{!currentUser ? 'Sign In' : 'Sign Out'}
		</button>
	)
}
