'use client'

import '../styles/tailwind/styles.css'

import { ThemeProvider } from 'next-themes'

import { AuthProvider } from '@/providers/AuthProvider'
import { QueryProvider } from '@/providers/QueryProvider'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html>
			<head />
			<body>
				<AuthProvider>
					<ThemeProvider>
						<QueryProvider>{children}</QueryProvider>
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
