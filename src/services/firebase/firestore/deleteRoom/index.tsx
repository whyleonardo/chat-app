import { roomsCollectionRef } from '../collections'

import { doc, deleteDoc } from 'firebase/firestore'

export async function deleteRoom(roomId: string) {
	const roomDocRef = doc(roomsCollectionRef, roomId)

	await deleteDoc(roomDocRef)
}
