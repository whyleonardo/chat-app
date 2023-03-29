import { roomsCollectionRef } from '../collections'

import { collection, doc, deleteDoc } from 'firebase/firestore'

export async function deleteMessage(messageId: string, roomId: string) {
	const roomDocRef = doc(roomsCollectionRef, roomId)
	const messageRef = collection(roomDocRef, 'messages')

	await deleteDoc(doc(messageRef, messageId))
}
