'use client'

import '../styles/tailwind/main.css'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'

import { AuthProvider } from '@/providers/AuthProvider'
import { QueryProvider } from '@/providers/QueryProvider'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	fallback: ['system-ui']
})

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html>
			<head />
			<body className={`${inter.variable} font-sans`}>
				<AuthProvider>
					<ThemeProvider>
						<QueryProvider>{children}</QueryProvider>
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
