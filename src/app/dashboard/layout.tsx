'use client'
import { Header } from 'components/UI/Header'
import { Sidebar } from 'components/UI/Sidebar'

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className="relative flex h-screen flex-col space-y-2">
			<Header />

			<div className="flex h-screen gap-2">
				<Sidebar />

				{children}
			</div>
		</div>
	)
}
