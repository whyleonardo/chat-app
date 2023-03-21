'use client'

import { SignInButton } from 'components/Button/SignInButton'

import { useAuth } from '@/providers/AuthProvider'
import { HStack, Avatar, Spinner } from '@chakra-ui/react'

export const Header = () => {
	const { currentUser, isLoadingUser } = useAuth()

	const displayName = currentUser?.displayName || undefined
	const photoURL = currentUser?.photoURL || undefined

	return (
		<HStack px="10" border="1px" h="16" justifyContent="space-between">
			<div>Oi, Chat!</div>

			<HStack>
				{isLoadingUser ? (
					<Spinner />
				) : (
					<>
						<SignInButton />
						<Avatar name={displayName} src={photoURL} />
					</>
				)}
			</HStack>
		</HStack>
	)
}
