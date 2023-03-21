'use client'

import { Button, useColorMode } from '@chakra-ui/react'

export const ToggleThemeButton = () => {
	const { toggleColorMode } = useColorMode()

	return <Button onClick={toggleColorMode}>Change Theme</Button>
}
