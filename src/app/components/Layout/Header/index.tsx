'use client'

import { Button } from '@/app/components/Button/Shared/Button'
import { SignInButton } from 'components/Button/SignInButton'
import { ToggleThemeButton } from 'components/Button/ToggleThemeButton'
import { Spinner } from 'components/Others/Spinner'

import { useAuth } from '@/providers/AuthProvider'
import * as Avatar from '@radix-ui/react-avatar'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const Header = () => {
	const { currentUser } = useAuth()
	const isLoadingUser = false

	const displayName = currentUser?.displayName || undefined
	const photoURL = currentUser?.photoURL || undefined

	return (
		<header className="flex justify-between items-center px-12 py-2 h-14 w-full border-b border-b-red-500">
			<span>oi</span>
			{/* <ToggleThemeButton /> */}

			{isLoadingUser ? (
				<Spinner />
			) : (
				<MenuMobile displayName={displayName} photoURL={photoURL} />
			)}
		</header>
	)
}

const MenuMobile = ({
	displayName,
	photoURL
}: {
	displayName: string | undefined
	photoURL: string | undefined
}) => {
	return (
		<div className="relative ">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger
					className="border-black radix-state-open:border-2"
					asChild
				>
					<Button>
						<Avatar.Root>
							<Avatar.Image
								alt={displayName}
								src={photoURL}
								className="rounded-full w-10 h-10"
							/>
							<Avatar.Fallback>{displayName}</Avatar.Fallback>
						</Avatar.Root>
					</Button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Portal>
					<DropdownMenu.Content
						align="end"
						sideOffset={5}
						className="radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down"
					>
						<DropdownMenu.Item className="bg-blue-500 px-4 py-2 rounded-sm space-y-2">
							<ToggleThemeButton title="ToggleTheme" isText isMenuButton />
						</DropdownMenu.Item>

						<DropdownMenu.Item className="bg-blue-500 px-4 py-2 rounded-sm space-y-2">
							<SignInButton isMenuButton />
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</div>
	)
}
