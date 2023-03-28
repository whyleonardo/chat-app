import { auth } from '../app'
import { usersCollectionRef } from '../firestore/collections'

import {
	browserLocalPersistence,
	GoogleAuthProvider,
	setPersistence,
	signInWithPopup
} from 'firebase/auth'
import { addDoc, updateDoc, query, where, getDocs } from 'firebase/firestore'

const provider = new GoogleAuthProvider()

export const signIn = async () => {
	setPersistence(auth, browserLocalPersistence)
		.then(async () => {
			await signInWithPopup(auth, provider)
				.then((result) => {
					const credential = GoogleAuthProvider.credentialFromResult(result)
					credential && console.log('Sucess!')
					// const token = credential?.accessToken
					// const user = result.user
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message

					console.error(errorCode, errorMessage)
				})

			const q = query(
				usersCollectionRef,
				where('uid', '==', auth.currentUser?.uid)
			)

			const querySnapshot = await getDocs(q)

			if (querySnapshot.docs.length > 0) {
				return
			} else {
				const docRef = await addDoc(usersCollectionRef, {
					email: auth.currentUser?.email,
					name: auth.currentUser?.displayName,
					uid: auth.currentUser?.uid,
					photoURL: auth.currentUser?.photoURL,
					createdAt: new Date().toLocaleDateString('en-US', {
						minute: '2-digit',
						hour: '2-digit',
						day: '2-digit',
						month: 'long',
						year: 'numeric'
					})
				})

				await updateDoc(docRef, {
					docId: docRef.id
				})
			}
		})
		.catch((error) => {
			console.log(error)
			// const errorCode = error.code
			// const errorMessage = error.message
			// const email = error.email
		})
}
