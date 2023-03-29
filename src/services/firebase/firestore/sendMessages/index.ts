import { roomsCollectionRef } from '../collections'

import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc
} from 'firebase/firestore'

export async function sendMessage(
	roomId: string,
	text: string,
	userId: string | undefined
) {
	const roomDocRef = doc(roomsCollectionRef, roomId)
	const messageRef = collection(roomDocRef, 'messages')

	const newMessageRef = await addDoc(messageRef, {
		text: text,
		timestamp: serverTimestamp(),
		sender: userId
	})

	await updateDoc(newMessageRef, {
		messageId: newMessageRef.id
	})
}
