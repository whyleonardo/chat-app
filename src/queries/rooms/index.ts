import { auth } from '@/services/firebase/app'
import { roomsCollectionRef } from '@/services/firebase/firestore/collections'
import { useQuery } from '@tanstack/react-query'
import {
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
	console.log('rodou')
	return useQuery(['room'], async () => {
		const docRef = doc(roomsCollectionRef, roomId)

		const docSnap = await getDoc(docRef)
		const room = docSnap.data()

		return room
	})
}
