import { roomsCollectionRef } from '../collections'

import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore'

export async function sendMessage(
	roomId: string,
	text: string,
	userId: string | undefined
) {
	const roomDocRef = doc(roomsCollectionRef, roomId)
	const messageRef = collection(roomDocRef, 'messages')

	await addDoc(messageRef, {
		text: text,
		timestamp: serverTimestamp(),
		sender: userId
	})
}
