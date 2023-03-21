'use client'
import { Header } from 'components/Layout/Header'
import { Sidebar } from 'components/Layout/Sidebar'

import { Grid, GridItem } from '@chakra-ui/react'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Grid
				h="100vh"
				w="100vw"
				templateAreas={`
					"header header"
					"sidebar main"`}
				gridTemplateRows="50px 1fr 30px"
				gridTemplateColumns="300px 1fr"
				gap="5"
			>
				<GridItem gridArea="header">
					<Header />
				</GridItem>

				<GridItem gridArea="sidebar">
					<Sidebar />
				</GridItem>

				<GridItem gridArea="main">{children}</GridItem>
			</Grid>
		</>
	)
}
