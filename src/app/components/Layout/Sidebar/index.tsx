'use client'

import { Spinner } from 'components/Others/Spinner'

import { useAuth } from '@/providers/AuthProvider'
import { useRooms } from '@/queries/rooms'
import { createRoom } from '@/services/firebase/firestore/createRoom'
import { Plus, X as XIcon } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'

export const revamp = true

export const Sidebar = () => {
	const { data, isLoading } = useRooms()
	const { currentUser } = useAuth()

	const displayName = currentUser?.displayName || ''
	const userUid = currentUser?.uid || ''

	return (
		<>
			<div className="w-72 hidden sm:flex sm:flex-col px-2">
				<header className="flex border-b border-b-brand-500/30 shadow-sm w-full h-14 justify-end items-center">
					<Dialog.Root>
						<Dialog.Trigger asChild>
							<button>
								<Plus size={28} />
							</button>
						</Dialog.Trigger>

						<Dialog.Portal>
							<Dialog.Overlay className=" bg-black/90 data-[state=open]:animate-overlayShow fixed inset-0" />
							<Dialog.Content className="fixed justify-start dark:bg-brand-700 shadow-md bg-brand-200 p-4 translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] rounded-lg">
								<div className="flex items-center justify-between">
									<Dialog.Title className="font-bold text-lg ">
										New Room
									</Dialog.Title>

									<Dialog.Close asChild>
										<button
											className="text-brand-900 dark:text-brand-100 hover:text-brand-800 dark:hover:text-brand-200 hover:scale-110 transition duration-150"
											aria-label="Close"
										>
											<XIcon weight="bold" size={18} />
										</button>
									</Dialog.Close>
								</div>

								<Dialog.Description className="opacity-70 mt-[10px] mb-5 text-[15px] leading-normal">
									Make changes to your profile here. Click save when you&apos;re
									done.
								</Dialog.Description>

								<fieldset className="flex items-center gap-5">
									<label
										className=" text-right text-md font-bold"
										htmlFor="name"
									>
										Name
									</label>
									<input
										className=" focus:shadow-md inline-flex h-[35px] bg-brand-900 w-2/4 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none "
										id="name"
										placeholder="Room name"
									/>
								</fieldset>

								<div className="mt-[25px] flex justify-end">
									<Dialog.Close asChild>
										<button
											onClick={() =>
												createRoom('maluquice', userUid, displayName)
											}
											className="text-brand-100 flex items-center gap-2 rounded-lg p-3 bg-brand-900 hover:bg-brand-800 shadow-md transition duration-150"
										>
											Create Room
											<Plus weight="bold" size={18} />
										</button>
									</Dialog.Close>
								</div>
							</Dialog.Content>
						</Dialog.Portal>
					</Dialog.Root>
				</header>

				<main className="flex flex-col relative py-4 gap-4 h-full">
					{isLoading && (
						<div className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
							<Spinner />
						</div>
					)}

					{data &&
						data.map((room) => (
							<>
								<div className="w-full" key={room.id}>
									<strong>{room.name}</strong>
								</div>

								<div className="w-full h-[1px] bg-brand-500/30 last:hidden" />
							</>
						))}

					{data && data.length === 0 && (
						<p className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
							VAZIO
						</p>
					)}
				</main>
			</div>

			{/* <MenuMobile /> */}
		</>
	)
}

const MenuMobile = () => {
	// return <div className="sm:hidden absolute bottom-5 right-5">Menuzinho</div>
}
