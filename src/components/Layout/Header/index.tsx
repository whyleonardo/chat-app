'use client'

import { useAuth } from '@/providers/AuthProvider'
import { HStack, Button } from '@chakra-ui/react'

export const Header = () => {
	const { logout, login } = useAuth()
	return (
		<HStack px="10" border="1px" h="16" justifyContent="space-between">
			<div>Oi, Chat!</div>
			<Button>SignIn</Button>
		</HStack>
	)
}
