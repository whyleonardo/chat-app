'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

	const pathname = usePathname()

	return (
		<>
			<div className="hidden w-72 px-2 sm:flex sm:flex-col">
				<header className="flex h-14 w-full items-center justify-end border-b border-b-brand-500/30 shadow-sm">
					<Dialog.Root>
						<Dialog.Trigger asChild>
							<button className="btn hover:scale-110">
								<Plus size={28} />
							</button>
						</Dialog.Trigger>

						<Dialog.Portal>
							<Dialog.Overlay className=" data-[state=open]:animate-overlayShow fixed inset-0 bg-black/90" />
							<Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-start rounded-lg bg-brand-100 p-4 shadow-md dark:bg-brand-700">
								<div className="flex items-center justify-between">
									<Dialog.Title className="text-lg font-bold ">
										New Room
									</Dialog.Title>

									<Dialog.Close asChild>
										<button
											className="btn transition duration-150 hover:scale-110"
											aria-label="Close"
										>
											<XIcon weight="bold" size={18} />
										</button>
									</Dialog.Close>
								</div>

								<Dialog.Description className="mt-[10px] mb-5 text-[15px] leading-normal opacity-70">
									Choose a name for your new room and start chatting.
								</Dialog.Description>

								<CreateNewRoom open={open} setOpen={setOpen} />
							</Dialog.Content>
						</Dialog.Portal>
					</Dialog.Root>
				</header>

				<main className="relative flex h-full flex-col gap-4 py-4">
					{isLoading && (
						<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
							<Spinner />
						</div>
					)}

					{data &&
						data.map((room) => (
							<>
								<div
									className={clsx(
										'w-full',
										pathname?.includes(room.id) && 'rounded-lg bg-brand-500 p-4'
									)}
									key={room.id}
								>
									<Link href={`/dashboard/${room.id}`} className="btn">
										{room.name}
									</Link>
								</div>

								<div className="h-[1px] w-full bg-brand-500/30 last:hidden" />
							</>
						))}

					{data && data.length === 0 && (
						<p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
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
					'fixed inset-x-4 bottom-4 z-50 w-auto rounded-lg shadow-lg md:top-4 md:right-4 md:left-auto md:bottom-auto md:w-full md:max-w-sm',
					'bg-brand-200 dark:bg-brand-800'
				)}
			>
				<div className="flex">
					<div className="flex w-0 flex-1 items-center py-4 pl-5">
						<div className="radix w-full">
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
						<div className="flex flex-col space-y-1 px-3 py-2">
							<div className="flex h-full items-center ">
								<Toast.Close className="flex h-10 w-full items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-brand-600 transition duration-150 hover:bg-brand-300/60 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-brand-500 focus-visible:ring-opacity-75 dark:text-brand-400 dark:hover:bg-brand-700">
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
