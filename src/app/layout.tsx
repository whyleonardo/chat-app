'use client'

import '../styles/tailwind/styles.css'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'

import { AuthProvider } from '@/providers/AuthProvider'
import { QueryProvider } from '@/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html>
			<head />
			<body className={`${inter.variable} font-sans dark:bg-brand-900`}>
				<AuthProvider>
					<ThemeProvider>
						<QueryProvider>{children}</QueryProvider>
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
