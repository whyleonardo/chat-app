'use client'
import { Header } from 'components/Layout/Header'
import { Sidebar } from 'components/Layout/Sidebar'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className="border flex flex-col">
			<div>
				<Header />
			</div>

			<div>
				<div>
					<Sidebar />
				</div>
				<div>{children}</div>
			</div>
		</div>
	)
}

{
	/*
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
		</GridItem>

		<GridItem gridArea="sidebar">
		</GridItem>

		<GridItem gridArea="main"></GridItem>
	</Grid>
 */
}
