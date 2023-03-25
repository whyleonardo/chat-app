'use client'

import { useState } from 'react'

import { CreateNewRoom } from 'components/Form/CreateNewRoom'
import { Spinner } from 'components/Others/Spinner'

import { useRooms } from '@/queries/rooms'
import { CheckCircle, Plus, X as XIcon } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Toast from '@radix-ui/react-toast'
import { clsx } from 'clsx'

export const Sidebar = () => {
	const { data, isLoading } = useRooms()
	const [open, setOpen] = useState(false)

	return (
		<>
			<div className="w-72 hidden sm:flex sm:flex-col px-2">
				<header className="flex border-b border-b-brand-500/30 shadow-sm w-full h-14 justify-end items-center">
					<Dialog.Root>
						<Dialog.Trigger asChild>
							<button className="btn hover:scale-110">
								<Plus size={28} />
							</button>
						</Dialog.Trigger>

						<Dialog.Portal>
							<Dialog.Overlay className=" bg-black/90 data-[state=open]:animate-overlayShow fixed inset-0" />
							<Dialog.Content className="fixed justify-start dark:bg-brand-700 shadow-md bg-brand-100 p-4 translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] rounded-lg">
								<div className="flex items-center justify-between">
									<Dialog.Title className="font-bold text-lg ">
										New Room
									</Dialog.Title>

									<Dialog.Close asChild>
										<button
											className="btn hover:scale-110 transition duration-150"
											aria-label="Close"
										>
											<XIcon weight="bold" size={18} />
										</button>
									</Dialog.Close>
								</div>

								<Dialog.Description className="opacity-70 mt-[10px] mb-5 text-[15px] leading-normal">
									Choose a name for your new room and start chatting.
								</Dialog.Description>

								<CreateNewRoom open={open} setOpen={setOpen} />
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
			<SucessToast open={open} setOpen={setOpen} />
		</>
	)
}

const MenuMobile = () => {
	// return <div className="sm:hidden absolute bottom-5 right-5">Menuzinho</div>
}

interface ToastProps {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SucessToast = ({ open, setOpen }: ToastProps) => {
	return (
		<Toast.Provider swipeDirection={'right'}>
			<Toast.Root
				open={open}
				onOpenChange={setOpen}
				className={clsx(
					'z-50 fixed bottom-4 inset-x-4 w-auto md:top-4 md:right-4 md:left-auto md:bottom-auto md:w-full md:max-w-sm shadow-lg rounded-lg',
					'bg-brand-200 dark:bg-brand-800'
				)}
			>
				<div className="flex">
					<div className="w-0 flex-1 flex items-center pl-5 py-4">
						<div className="w-full radix">
							<Toast.Title className="flex items-center gap-2 text-sm font-medium text-brand-900 dark:text-brand-100">
								Room is Created
								<CheckCircle
									size={24}
									weight="fill"
									className="text-green-500"
								/>
							</Toast.Title>
							<Toast.Description className="mt-1 text-sm text-gray-700 dark:text-gray-400">
								Your room is now created with sucess!
							</Toast.Description>
						</div>
					</div>
					<div className="flex">
						<div className="flex flex-col px-3 py-2 space-y-1">
							<div className="h-full flex items-center ">
								<Toast.Close className="w-full border border-transparent rounded-lg h-10 px-3 py-2 flex items-center justify-center text-sm font-medium text-brand-600 dark:text-brand-400 hover:bg-brand-300/60 dark:hover:bg-brand-700 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-brand-500 focus-visible:ring-opacity-75 transition duration-150">
									Close
								</Toast.Close>
							</div>
						</div>
					</div>
				</div>
			</Toast.Root>
			{/* TODO add viewport styles */}
			<Toast.Viewport />
		</Toast.Provider>
	)
}
