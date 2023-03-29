'use client'

import { useState } from 'react'

import { useAuth } from '@/providers/AuthProvider'
import { sendMessage } from '@/services/firebase/firestore/sendMessages'
import { QueryObserverResult } from '@tanstack/react-query'
import { DocumentData } from 'firebase/firestore'

export const SendMessage = ({
	roomId,
	refetch
}: {
	roomId: string
	refetch: () => Promise<QueryObserverResult<DocumentData | undefined, unknown>>
}) => {
	const { currentUser } = useAuth()
	const [text, setText] = useState('')

	function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
		setText(e.target.value)
	}

	function handleSendMessage() {
		sendMessage(roomId, text, currentUser?.uid)
		setText('')
		refetch()
	}
	return (
		<div className="flex w-full items-center justify-center gap-4 border-t border-brand-200 py-2 dark:border-brand-700">
			<input
				className=" w-2/4 rounded-lg border-b border-brand-500 bg-transparent p-3 text-brand-900 focus:ring-brand-500 dark:text-brand-100"
				type="text"
				value={text}
				onChange={handleTextChange}
			/>

			<button
				className="btn rounded-lg bg-gradient-to-r from-brand-400 to-brand-500 p-3 text-brand-100 hover:text-brand-100/80"
				onClick={handleSendMessage}
				disabled={text.length === 0}
			>
				Send
			</button>
		</div>
	)
}
