'use client'

import '../styles/tailwind/styles.css'

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
					<QueryProvider>{children}</QueryProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
