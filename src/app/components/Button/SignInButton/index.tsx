'use client'

import { useAuth } from '@/providers/AuthProvider'
import clsx from 'clsx'

export const SignInButton = ({ isMenuButton }: { isMenuButton?: boolean }) => {
	const { login, logout, currentUser } = useAuth()

	return (
		<button
			className={clsx(
				' transition duration-150',
				isMenuButton
					? 'hover:text-brand-600 dark:hover:text-brand-300'
					: 'hover:text-black/50 dark:hover:text-white/50'
			)}
			onClick={!currentUser ? login : logout}
		>
			{!currentUser ? 'Sign In' : 'Sign Out'}
		</button>
	)
}
