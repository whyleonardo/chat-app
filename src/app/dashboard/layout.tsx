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
			<div className="flex justify-end px-8 py-2 border border-red-500">
				<Header />
			</div>

			<div className="flex">
				<div className="border w-72 border-blue-500">
					<Sidebar />
				</div>
				<div className="border border-green-500 w-full">{children}</div>
			</div>
		</div>
	)
}
