'use client'

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
	const isDark = true
	return (
		<button
			className={clsx(
				'text-black dark:text-white dark:hover:text-yellow-500 hover:text-yellow-500 transition duration-150',
				isMenuButton &&
					'dark:text-black hover:text-white/50 dark:hover:text-white/50'
			)}
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
