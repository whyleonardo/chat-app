'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Sun, Moon } from '@phosphor-icons/react'
import clsx from 'clsx'

export const ToggleThemeButton = ({
	title,
	isText,
	isMenuButton
}: {
	title?: string
	isText?: boolean
	isMenuButton?: boolean
}) => {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	const isDark = theme === 'dark'

	function handleChangeTheme() {
		if (isDark) {
			setTheme('light')
		} else {
			setTheme('dark')
		}
	}

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<button
			className={clsx(
				'text-black dark:text-white transition duration-150',
				isMenuButton
					? 'hover:text-white/50 dark:hover:text-white/50'
					: 'dark:hover:text-yellow-500 hover:text-yellow-500'
			)}
			onClick={handleChangeTheme}
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
