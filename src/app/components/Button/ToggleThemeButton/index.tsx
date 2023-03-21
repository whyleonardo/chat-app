'use client'

import { useColorMode } from '@chakra-ui/react'
import { Sun, Moon } from '@phosphor-icons/react'

export const ToggleThemeButton = ({
	title,
	isText
}: {
	title?: string
	isText?: boolean
}) => {
	const { toggleColorMode, colorMode } = useColorMode()

	const isDark = colorMode === 'dark'

	return (
		<button
			className="text-black dark:text-white dark:hover:text-yellow-500 hover:text-yellow-500 transition duration-150"
			onClick={toggleColorMode}
		>
			{isText ? (
				title
			) : isDark ? (
				<Moon alt="Moon Icon" size={24} weight="light" />
			) : (
				<Sun alt="Sun Icon" size={24} weight="light" />
			)}
		</button>
	)
}
