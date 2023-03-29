'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useRef, useState } from 'react'

import { SendMessage } from 'components/Form/SendMessage'
import { Spinner } from 'components/Others/Spinner'

import { useAuth } from '@/providers/AuthProvider'
import { useRoom } from '@/queries/rooms'
import { roomsCollectionRef } from '@/services/firebase/firestore/collections'
import { deleteMessage } from '@/services/firebase/firestore/deleteMessage'
import { deleteRoom } from '@/services/firebase/firestore/deleteRoom'
import { Message, Room } from '@/types/Room'
import { Trash } from '@phosphor-icons/react'
import * as ContextMenu from '@radix-ui/react-context-menu'
import clsx from 'clsx'
import {
	collection,
	doc,
	DocumentData,
	onSnapshot,
	orderBy,
	query
} from 'firebase/firestore'

export default function RoomLayout({
	children,
	params
}: {
	children: ReactNode
	params: { roomId: string }
}) {
	const [messages, setMessages] = useState<Message[] | DocumentData>([])
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const { data, refetch, isLoading } = useRoom(params.roomId)

	const { currentUser } = useAuth()

	const room = data as Room
	const router = useRouter()

	const docRef = doc(roomsCollectionRef, params.roomId)
	const messagesRef = collection(docRef, 'messages')
	const q = query(messagesRef, orderBy('timestamp', 'asc'))

	function handleDeleteRoom() {
		deleteRoom(params.roomId)
		router.push('/dashboard')
	}

	useEffect(() => {
		setTimeout(() => {
			const unsubscribe = onSnapshot(q, (snapshot) => {
				const newMessages = snapshot.docs.map((doc) => doc.data())
				setMessages(newMessages)
			})
			return () => unsubscribe()
		}, 10)
	}, [])

	useEffect(() => {
		setTimeout(() => {
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
		}, 1)
	}, [messages])

	return (
		<div className="v-stack w-full justify-between gap-2 border-l border-brand-200 dark:border-brand-700">
			<div className="h-stack h-14 items-center justify-end rounded-lg bg-brand-600 px-4 shadow-sm">
				<button onClick={handleDeleteRoom}>Delete Room</button>
			</div>
			<div className="v-stack relative w-full flex-1 space-y-2 overflow-y-scroll px-8 py-2 pt-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-brand-600 scrollbar-thumb-rounded-lg">
				{isLoading ? (
					<Spinner />
				) : (
					messages &&
					messages.map((message: Message) => (
						<ContextMenu.Root key={message.messageId}>
							<ContextMenu.Trigger
								className={clsx(
									'max-w-xs rounded-lg p-2',
									message.sender === currentUser?.uid
										? 'self-end bg-brand-200 dark:bg-brand-400'
										: 'self-start bg-brand-300 dark:bg-brand-600',
									message.sender === 'Server' &&
										'absolute left-[50%] top-0 w-[100rem] translate-x-[-50%] bg-transparent text-center text-brand-100/60 underline dark:bg-transparent'
								)}
							>
								<div key={message.messageId}>
									<span className={clsx('break-words')}>{message.text}</span>
								</div>
							</ContextMenu.Trigger>
							<ContextMenu.Portal>
								<ContextMenu.Content>
									<ContextMenu.Item>
										{message.sender === currentUser?.uid && (
											<button
												className="h-stack items-center gap-2 rounded-md bg-brand-700 p-2 text-white"
												onClick={() =>
													deleteMessage(message.messageId, params.roomId)
												}
											>
												Delete
												<Trash weight="fill" />
											</button>
										)}
									</ContextMenu.Item>
								</ContextMenu.Content>
							</ContextMenu.Portal>
						</ContextMenu.Root>
					))
				)}
				<div ref={messagesEndRef} />
			</div>

			<SendMessage roomId={room?.roomId} refetch={refetch} />
		</div>
	)
}
