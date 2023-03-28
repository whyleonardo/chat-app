import { db } from '../../app'

import { collection } from 'firebase/firestore'

export const usersCollectionRef = collection(db, 'users')
export const roomsCollectionRef = collection(db, 'rooms')
export const messagesCollectionRef = (roomId: string) =>
	collection(db, 'rooms', roomId, 'messages')
