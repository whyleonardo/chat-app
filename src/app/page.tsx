import { Metadata } from 'next'

import { DisplayName } from '@/app/components/Others/DisplayName'
import { SignInButton } from 'components/Button/SignInButton'
import { ToggleThemeButton } from 'components/Button/ToggleThemeButton'

export const metadata: Metadata = {
	title: 'Home',
	description: 'Home page',
	keywords: 'home, page'
}

export default function Home() {
	return (
		<>
			<SignInButton />
			<DisplayName />
			<ToggleThemeButton />
		</>
	)
}
