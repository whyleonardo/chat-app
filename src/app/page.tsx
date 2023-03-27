import { Metadata } from 'next'

import { SignInButton } from 'components/Button/SignInButton'
import { ToggleThemeButton } from 'components/Button/ToggleThemeButton'
import { Logo } from 'components/Others/Logo'

export const metadata: Metadata = {
	title: 'Home',
	description: 'Home page',
	keywords: 'home, page'
}

export default function Home() {
	return (
		<div className="v-stack h-full">
			<header className="h-stack center h-16 justify-between px-6">
				<Logo />

				<nav className="h-stack space-x-4">
					<SignInButton />
					<ToggleThemeButton />
				</nav>
			</header>

			<div className="v-stack center border">
				<button className="btn">Olá</button>
				<button>Olá</button>
			</div>
		</div>
	)
}
