import { auth } from '@/services/firebase/app'
import { roomsCollectionRef } from '@/services/firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import { getDocs, query, where } from 'firebase/firestore'

export const useRooms = () => {
	return useQuery(['rooms'], async () => {
		const q = query(
			roomsCollectionRef,
			where('participants', 'array-contains', auth.currentUser?.uid)
		)

		const snapshot = await getDocs(q)
		const rooms: Array<any> = []
		snapshot.docs.map((doc) => {
			const room = doc.data()
			room.id = doc.id
			rooms.push(room)
		})

		// const isParticipant = snapshot.docs.map((doc) => doc.exists())

		return rooms
	})
}
