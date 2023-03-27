'use client'

import { Chat } from '@phosphor-icons/react'

export const Logo = () => {
	return (
		<span className="flex cursor-pointer items-center text-lg font-bold transition duration-300 hover:scale-[1.05]">
			ChatApp <Chat className="text-brand-300" weight="duotone" size={32} />
		</span>
	)
}
