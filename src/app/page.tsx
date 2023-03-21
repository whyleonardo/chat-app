import { DisplayName } from '@/app/components/Others/DisplayName'
import { SignInButton } from 'components/Button/SignInButton'
import { ToggleThemeButton } from 'components/Button/ToggleThemeButton'

export default function Home() {
	return (
		<>
			<SignInButton />
			<DisplayName />
			<ToggleThemeButton />
		</>
	)
}
