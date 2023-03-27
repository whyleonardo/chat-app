'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

import { SendMessage } from 'components/Form/SendMessage'

import { useAuth } from '@/providers/AuthProvider'
import { useRoom } from '@/queries/rooms'
import { Room } from '@/types/Room'
import clsx from 'clsx'

export default function RoomLayout({
	children,
	params
}: {
	children: ReactNode
	params: { roomId: string }
}) {
	const [text, setText] = useState('')
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const { data, refetch } = useRoom(params.roomId)

	const { currentUser } = useAuth()

	const room = data as Room

	useEffect(() => {
		setTimeout(() => {
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
		}, 1)
	}, [room?.messages])

	return (
		<div className="v-stack w-full justify-between space-y-2 border-l md:py-2">
			<div className="v-stack h-[80vh] w-full space-y-2 overflow-y-scroll px-8 py-2 pt-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-brand-600 scrollbar-thumb-rounded-lg">
				{room &&
					room.messages.map((message) => (
						<div
							key={message.timestamp}
							className={clsx(
								'max-w-xs rounded-lg p-2',
								message.sender === currentUser?.uid
									? 'self-end bg-brand-200 dark:bg-brand-400'
									: 'self-start bg-brand-300 dark:bg-brand-600'
							)}
						>
							<span className={clsx('break-words')}>{message.text}</span>
						</div>
					))}
				<div ref={messagesEndRef} />
			</div>

			<SendMessage roomId={room?.roomId} refetch={refetch} onChange={setText} />
		</div>
	)
}
