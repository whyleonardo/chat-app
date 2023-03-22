'use client'

import { SignInButton } from 'components/Button/SignInButton'
import { ToggleThemeButton } from 'components/Button/ToggleThemeButton'

import { useAuth } from '@/providers/AuthProvider'
import * as Avatar from '@radix-ui/react-avatar'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const Header = () => {
	const { currentUser, isLoadingUser } = useAuth()

	const displayName = currentUser?.displayName || undefined
	const photoURL = currentUser?.photoURL || undefined

	return (
		<div>
			<div>
				{isLoadingUser ? (
					'Carregando'
				) : (
					<>
						<div className="hidden md:flex md:space-x-6 md:items-center">
							<ToggleThemeButton />
							<SignInButton />
							<Avatar.Root>
								<Avatar.Image
									alt={displayName}
									src={photoURL}
									className="w-10 rounded-full"
								/>
								<Avatar.Fallback>CT</Avatar.Fallback>
							</Avatar.Root>
						</div>

						<MenuMobile displayName={displayName} photoURL={photoURL} />
					</>
				)}
			</div>
		</div>
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
		<div className="flex md:hidden">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<Avatar.Root>
						<Avatar.Image
							alt={displayName}
							src={photoURL}
							className="w-10 rounded-full"
						/>
						<Avatar.Fallback>{displayName}</Avatar.Fallback>
					</Avatar.Root>
				</DropdownMenu.Trigger>

				<DropdownMenu.Portal>
					<DropdownMenu.Content>
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
