'use client'

import { useTheme } from 'next-themes'

import { Button } from '@/app/components/Button/Shared/Button'
import { SignInButton } from 'components/Button/SignInButton'
import { ToggleThemeButton } from 'components/Button/ToggleThemeButton'
import { Spinner } from 'components/Others/Spinner'

import { useAuth } from '@/providers/AuthProvider'
import * as Avatar from '@radix-ui/react-avatar'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const Header = () => {
	const { currentUser, isLoadingUser } = useAuth()

	const displayName = currentUser?.displayName || undefined
	const photoURL = currentUser?.photoURL || undefined

	return (
		<header className="flex justify-between items-center px-12 py-2 h-14 w-full border-b border-b-red-500">
			<span>oi</span>
			{/* <ToggleThemeButton /> */}

			{isLoadingUser ? (
				<Spinner />
			) : (
				<Menu displayName={displayName} photoURL={photoURL} />
			)}
		</header>
	)
}

const Menu = ({
	displayName,
	photoURL
}: {
	displayName: string | undefined
	photoURL: string | undefined
}) => {
	const { setTheme } = useTheme()
	return (
		<div className="relative ">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<Button>
						<Avatar.Root>
							<Avatar.Image
								alt={displayName}
								src={photoURL}
								className="rounded-full w-10 h-10 hover:scale-[1.03] transition duration-150"
							/>
							<Avatar.Fallback>{displayName}</Avatar.Fallback>
						</Avatar.Root>
					</Button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Portal>
					<DropdownMenu.Content
						align="end"
						sideOffset={5}
						className="bg-slate-500 shadow-md font-light text-sm rounded-lg radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down"
					>
						<DropdownMenu.Item className=" px-4 py-2 space-y-2 focus:outline-none">
							<ToggleThemeButton isText title="Toggle Theme" isMenuButton />
						</DropdownMenu.Item>

						<DropdownMenu.Separator className=" bg-white/20 w-full h-[1px]" />

						<DropdownMenu.Item className=" px-4 py-2 space-y-2 focus:outline-none">
							<SignInButton isMenuButton />
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</div>
	)
}
