'use client'
import { Header } from 'components/Layout/Header'
import { Sidebar } from 'components/Layout/Sidebar'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex flex-col space-y-2 relative h-screen">
			<Header />

			<div className="flex gap-2 h-full">
				<Sidebar />

				<div className="border border-green-500 w-full">{children}</div>
			</div>
		</div>
	)
}
