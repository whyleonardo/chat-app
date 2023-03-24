import { roomsCollectionRef } from '../collections'

import { db } from '@/services/firebase/app'
import {
	collection,
	addDoc,
	doc,
	setDoc,
	updateDoc,
	arrayUnion,
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

	const messagesRef = collection(roomDocRef, 'messages')

	await addDoc(messagesRef, {
		text: 'Bem-vindo à sala!',
		createdAt: serverTimestamp(),
		sender: 'Server'
	})

	return roomDocRef.id
}

// export async function addMemberToRoom(roomId: string, memberUid: string) {
// 	const roomRef = doc(db, 'rooms', roomId)
// 	await updateDoc(roomRef, { members: arrayUnion(memberUid) })
// 	console.log(`Usuário ${memberUid} adicionado à sala ${roomId}`)
// }