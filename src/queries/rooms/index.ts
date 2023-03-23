import { auth } from '@/services/firebase/app'
import { roomsCollectionRef } from '@/services/firebase/firestore/collections'
import { useQuery } from '@tanstack/react-query'
import { getDocs, query, where } from 'firebase/firestore'

export const useRooms = () => {
	return useQuery(['rooms'], async () => {
		const q = query(
			roomsCollectionRef,
			where('members', 'array-contains', auth.currentUser?.uid)
		)

		const snapshot = await getDocs(q)
		// TODO - Refactor this to use a Room type
		const rooms: Array<any> = []
		snapshot.docs.map((doc) => {
			const room = doc.data()
			room.id = doc.id
			rooms.push(room)
		})

		return rooms
	})
}
