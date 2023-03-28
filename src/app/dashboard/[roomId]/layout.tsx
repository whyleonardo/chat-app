'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

import { SendMessage } from 'components/Form/SendMessage'
import { Spinner } from 'components/Others/Spinner'

import { useAuth } from '@/providers/AuthProvider'
import { useRoom } from '@/queries/rooms'
import { roomsCollectionRef } from '@/services/firebase/firestore/collections'
import { Message, Room } from '@/types/Room'
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

	useEffect(() => {
		setTimeout(() => {
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
		}, 1)
	}, [messages])

	useEffect(() => {
		async function fetchMessages() {
			const docRef = doc(roomsCollectionRef, params.roomId)

			const messagesRef = collection(docRef, 'messages')
			const q = query(messagesRef, orderBy('timestamp', 'asc'))

			const unsubscribe = onSnapshot(q, (snapshot) => {
				const newMessages = [] as DocumentData[]
				snapshot.forEach((doc) => {
					newMessages.push(doc.data())
				})
				setMessages(newMessages)
			})
			return unsubscribe
		}

		fetchMessages()
	}, [params.roomId])

	return (
		<div className="v-stack w-full justify-between space-y-2 border-l md:py-2">
			<div className="v-stack h-[80vh] w-full space-y-2 overflow-y-scroll px-8 py-2 pt-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-brand-600 scrollbar-thumb-rounded-lg">
				{isLoading ? (
					<Spinner />
				) : (
					messages &&
					messages.map((message: Message) => (
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
					))
				)}
				<div ref={messagesEndRef} />
			</div>

			<SendMessage roomId={room?.roomId} refetch={refetch} />
		</div>
	)
}
