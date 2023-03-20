'use client'

import { Button, useColorMode } from '@chakra-ui/react'

export function ToggleThemeButton() {
	const { toggleColorMode } = useColorMode()

	return <Button onClick={toggleColorMode}>Change Theme</Button>
}
