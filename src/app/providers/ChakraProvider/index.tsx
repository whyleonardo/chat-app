'use client'

import { theme } from '@/styles/chakra/theme'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider as Provider, ColorModeScript } from '@chakra-ui/react'

export function ChakraProvider({ children }: { children: React.ReactNode }) {
	return (
		<CacheProvider>
			<Provider theme={theme}>
				{children}
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			</Provider>
		</CacheProvider>
	)
}
