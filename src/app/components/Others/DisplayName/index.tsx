'use client'

import { useAuth } from '@/providers/AuthProvider'

export const DisplayName = () => {
	const { currentUser } = useAuth()
	return <p>{currentUser?.displayName || 'No user is logged'}</p>
}
