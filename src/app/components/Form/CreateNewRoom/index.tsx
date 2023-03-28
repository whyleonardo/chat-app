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
				<label className=" text-md text-right font-bold" htmlFor="name">
					Name
				</label>
				<input
					className="inline-flex h-[35px] w-3/4 items-center justify-center rounded-[4px] bg-brand-900 px-[10px] text-[15px] leading-none text-brand-100 shadow-[0_0_0_1px] outline-none focus:shadow-md "
					id="name"
					placeholder="Room name"
					onChange={handleRoomNameChange}
					value={roomName}
				/>
			</fieldset>

			<div className="mt-6 flex justify-end">
				<Trigger asChild>
					<button
						onClick={handleSubmit}
						disabled={roomName.length === 0}
						className="flex items-center gap-2 rounded-lg bg-brand-900 p-3 text-brand-100 shadow-md transition duration-150 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-brand-800"
					>
						Create Room
						<Plus weight="bold" size={18} />
					</button>
				</Trigger>
			</div>
		</>
	)
}
