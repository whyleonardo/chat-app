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

	await addDoc(messagesRef, {
		text: 'Bem-vindo à sala!',
		timestamp: serverTimestamp(),
		sender: 'Server'
	})

	return roomDocRef.id
}

// export async function addMemberToRoom(roomId: string, memberUid: string) {
// 	const roomRef = doc(db, 'rooms', roomId)
// 	await updateDoc(roomRef, { members: arrayUnion(memberUid) })
// 	console.log(`Usuário ${memberUid} adicionado à sala ${roomId}`)
// }
