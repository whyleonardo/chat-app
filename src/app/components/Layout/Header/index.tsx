'use client'

import { SignInButton } from 'components/Button/SignInButton'
import { ToggleThemeButton } from 'components/Button/ToggleThemeButton'

import { useAuth } from '@/providers/AuthProvider'
import {
	HStack,
	Avatar,
	Spinner,
	Menu,
	MenuButton,
	MenuList,
	MenuItem
} from '@chakra-ui/react'

export const Header = () => {
	const { currentUser, isLoadingUser } = useAuth()

	const displayName = currentUser?.displayName || undefined
	const photoURL = currentUser?.photoURL || undefined

	return (
		<HStack px="8" border="1px" h="16" justifyContent="flex-end">
			<HStack>
				{isLoadingUser ? (
					<Spinner />
				) : (
					<>
						<div className="hidden md:flex space-x-6">
							<ToggleThemeButton />
							<SignInButton />
							<Avatar size="sm" name={displayName} src={photoURL} />
						</div>

						<MenuMobile displayName={displayName} photoURL={photoURL} />
					</>
				)}
			</HStack>
		</HStack>
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
			<Menu>
				<MenuButton>
					<Avatar size="sm" name={displayName} src={photoURL} />
				</MenuButton>
				<MenuList className="bg-blue-500 px-4 py-2 rounded-sm space-y-2">
					<MenuItem>
						<SignInButton />
					</MenuItem>

					<MenuItem>
						<ToggleThemeButton title="ToggleTheme" isText />
					</MenuItem>
				</MenuList>
			</Menu>
		</div>
	)
}
