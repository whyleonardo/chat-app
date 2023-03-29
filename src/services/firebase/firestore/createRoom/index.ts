import { roomsCollectionRef } from '../collections'

import {
	collection,
	addDoc,
	updateDoc,
	serverTimestamp
} from 'firebase/firestore'

export async function createRoom(
	roomName: string,
	creatorUID: string,
	creatorName: string
) {
	const newRoom = {
		name: roomName,
		creatorUID: creatorUID,
		creatorName: creatorName,
		createdAt: serverTimestamp(),
		admins: [creatorUID],
		members: [creatorUID]
	}

	const roomDocRef = await addDoc(roomsCollectionRef, newRoom)

	await updateDoc(roomDocRef, {
		roomId: roomDocRef.id
	})

	const messagesRef = collection(roomDocRef, 'messages')

	const actualDate = new Date()
	const formattedDate = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(actualDate)

	const serverMessage = await addDoc(messagesRef, {
		text: `Chat was created in ${formattedDate} by ${creatorName}`,
		timestamp: serverTimestamp(),
		sender: 'Server'
	})

	await updateDoc(serverMessage, {
		messageId: serverMessage.id
	})

	return roomDocRef.id
}

// export async function addMemberToRoom(roomId: string, memberUid: string) {
// 	const roomRef = doc(db, 'rooms', roomId)
// 	await updateDoc(roomRef, { members: arrayUnion(memberUid) })
// 	console.log(`Usuário ${memberUid} adicionado à sala ${roomId}`)
// }
