'use client'

import { ReactNode } from 'react'

import { useRoom } from '@/queries/rooms'

type Room = {
	createdAt: string
	admin: string[]
	creatorName: string
	creatorId: string
	members: string[]
	name: string
	messages: Array<{
		text: string
		createdAt: string
		sender: string
	}>
}

export default function RoomLayout({
	children,
	params
}: {
	children: ReactNode
	params: { roomId: string }
}) {
	const { data } = useRoom(params.roomId)

	const room = data as Room

	return (
		<div>
			{/* {children} */}
			{room &&
				room.messages.map((message) => (
					<p key={message.createdAt}>{message.text}</p>
				))}
		</div>
	)
}
