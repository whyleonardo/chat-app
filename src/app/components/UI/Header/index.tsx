'use client'

import { SignInButton } from 'components/Button/SignInButton'
import { ToggleThemeButton } from 'components/Button/ToggleThemeButton'
import { Spinner } from 'components/Others/Spinner'

import { useAuth } from '@/providers/AuthProvider'
import { Chat, CaretDown } from '@phosphor-icons/react'
import * as Avatar from '@radix-ui/react-avatar'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const Header = () => {
	const { currentUser, isLoadingUser } = useAuth()

	const displayName = currentUser?.displayName || undefined
	const photoURL = currentUser?.photoURL || undefined

	return (
		<header className="sm:12 sticky flex h-14 w-full items-center justify-between border-b border-b-brand-900/10 px-8 py-2 shadow-sm dark:border-b-brand-100/10">
			<span className="flex cursor-pointer items-center text-lg font-bold transition duration-300 hover:scale-[1.05]">
				ChatApp <Chat className="text-brand-300" weight="duotone" size={32} />
			</span>

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
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<Avatar.Root>
					<Avatar.Image
						alt={displayName}
						src={photoURL}
						className="h-10 w-10 rounded-full transition duration-150 hover:scale-[1.03]"
					/>
					<Avatar.Fallback className="btn flex cursor-pointer items-center gap-2">
						{displayName}
						<CaretDown
							className="text-brand-300 dark:text-brand-600"
							weight="bold"
							size={24}
						/>
					</Avatar.Fallback>
				</Avatar.Root>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					align="end"
					sideOffset={5}
					className="radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down rounded-lg bg-brand-200 px-2 text-sm font-light shadow-md dark:bg-brand-700"
				>
					<DropdownMenu.Item className=" space-y-2 px-4 py-2 focus:outline-none">
						<ToggleThemeButton isText title="Toggle Theme" isMenuButton />
					</DropdownMenu.Item>

					<DropdownMenu.Separator className="h-[1px] w-full bg-brand-500/20" />

					<DropdownMenu.Item className=" space-y-2 px-4 py-2 focus:outline-none">
						<SignInButton isMenuButton />
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	)
}
