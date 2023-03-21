'use client'
import { AuthProvider } from '@/providers/AuthProvider'
import { ChakraProvider } from '@/providers/ChakraProvider'
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
					<QueryProvider>
						<ChakraProvider>{children}</ChakraProvider>
					</QueryProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
