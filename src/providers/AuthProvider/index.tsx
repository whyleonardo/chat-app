'use client'

import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

import { AuthValueProps } from './types'

import { auth } from '@/services/firebase/app'
import { signIn } from '@/services/firebase/auth'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'

const AuthContext = createContext<AuthValueProps>({} as AuthValueProps)

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<User | null>()
	const [isLoadingUser, setIsLoadingUser] = useState(true)

	const router = useRouter()

	function logout() {
		return signOut(auth)
	}

	function login() {
		return signIn()
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsLoadingUser(true)
			if (user) {
				setCurrentUser(user)
				router.push('/dashboard')
			} else {
				setCurrentUser(null)
				router.push('/')
			}
			setIsLoadingUser(false)
		})

		return () => unsubscribe()
	}, [])

	useEffect(() => {
		if (currentUser) {
			router.push('/dashboard')
		} else {
			router.push('/')
		}
	}, [currentUser])

	const values = {
		currentUser,
		auth,
		logout,
		login,
		isLoadingUser
	}

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
