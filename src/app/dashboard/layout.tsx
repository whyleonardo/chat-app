'use client'
import { Header } from 'components/Layout/Header'
import { Sidebar } from 'components/Layout/Sidebar'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex flex-col space-y-2">
			<Header />

			<div className="flex space-x-2">
				<div className="border w-72 border-blue-500">
					<Sidebar />
				</div>
				<div className="border border-green-500 w-full">{children}</div>
			</div>
		</div>
	)
}
