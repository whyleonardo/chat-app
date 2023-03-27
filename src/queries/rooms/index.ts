import { auth } from '@/services/firebase/app'
import { roomsCollectionRef } from '@/services/firebase/firestore/collections'
import { useQuery } from '@tanstack/react-query'
import {
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	query,
	where
} from 'firebase/firestore'

export const useRooms = () => {
	return useQuery(['rooms'], async () => {
		const q = query(
			roomsCollectionRef,
			where('members', 'array-contains', auth.currentUser?.uid)
		)

		const snapshot = await getDocs(q)
		const rooms: Array<DocumentData> = []
		snapshot.docs.map((doc) => {
			const room = doc.data()
			room.id = doc.id
			rooms.push(room)
		})

		return rooms
	})
}

export const useRoom = (roomId: string) => {
	return useQuery(['room'], async () => {
		const docRef = doc(roomsCollectionRef, roomId)

		const docSnap = await getDoc(docRef)

		const messagesRef = collection(docRef, 'messages')
		const messagesSnapshot = await getDocs(messagesRef)

		const messages = messagesSnapshot.docs.map((doc) => doc.data())

		if (docSnap.exists()) {
			const data = docSnap.data()
			const room: DocumentData = { ...data, messages }
			return room
		}
	})
}
