'use client'

import { useState } from 'react'
import React from 'react'

import { useAuth } from '@/providers/AuthProvider'
import { createRoom } from '@/services/firebase/firestore/createRoom'
import { Plus } from '@phosphor-icons/react'
import { Trigger } from '@radix-ui/react-dialog'
import { z, ZodIssue } from 'zod'

const mySchema = z.object({
	roomName: z.string().min(1, { message: 'Room name is required' })
})

interface CreateNewRoomProps {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateNewRoom = ({ open, setOpen }: CreateNewRoomProps) => {
	const [roomName, setRoomName] = useState('')
	const [errors, setErrors] = useState<ZodIssue[]>([])

	const { currentUser } = useAuth()

	const displayName = currentUser?.displayName || ''
	const userUid = currentUser?.uid || ''

	function handleRoomNameChange(event: React.ChangeEvent<HTMLInputElement>) {
		setRoomName(event.target.value)
	}

	async function handleSubmit() {
		try {
			const validatedDate = await mySchema.parseAsync({ roomName: roomName })
			createRoom(roomName, userUid, displayName)

			if (open) {
				setOpen(false)
				setTimeout(() => {
					setOpen(true)
				}, 400)
			} else {
				setOpen(true)
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				setErrors(error.errors)
			} else {
				console.log(errors)
			}
		}
	}

	return (
		<>
			<fieldset className="flex items-center gap-5">
				<label className=" text-right text-md font-bold" htmlFor="name">
					Name
				</label>
				<input
					className="text-brand-100 focus:shadow-md inline-flex h-[35px] bg-brand-900 w-3/4 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none "
					id="name"
					placeholder="Room name"
					onChange={handleRoomNameChange}
					value={roomName}
				/>
			</fieldset>

			<div className="flex mt-6 justify-end">
				<Trigger asChild>
					<button
						onClick={handleSubmit}
						disabled={roomName.length === 0}
						className="text-brand-100 flex items-center gap-2 rounded-lg p-3 bg-brand-900 hover:bg-brand-800 shadow-md transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Create Room
						<Plus weight="bold" size={18} />
					</button>
				</Trigger>
			</div>
		</>
	)
}
