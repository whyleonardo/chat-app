'use client'
import { ChakraProvider } from '@/providers/ChakraProvider'
import { Stack } from '@chakra-ui/react'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html>
			<head />
			<body>
				<ChakraProvider>
					<Stack h="100vh" justifyContent="center" alignItems="center">
						{children}
					</Stack>
				</ChakraProvider>
			</body>
		</html>
	)
}
