import { usersCollectionRef } from '@/services/firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import { getDocs, query } from 'firebase/firestore'

export const useRooms = () => {
	return useQuery(['users'], async () => {
		const q = query(usersCollectionRef)

		const snapshot = await getDocs(q)
		const users: Array<any> = []
		snapshot.docs.map((doc) => {
			const user = doc.data()
			user.id = doc.id
			users.push(users)
		})

		// const isParticipant = snapshot.docs.map((doc) => doc.exists())

		return users
	})
}
