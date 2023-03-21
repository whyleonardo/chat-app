import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Dashboard page',
	keywords: 'dashboard, page'
}

export default function DashboardPage() {
	return (
		<div>
			<p> Hello World </p>
		</div>
	)
}
