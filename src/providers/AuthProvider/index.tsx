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
	const [isLoadingUser, setIsLoadingUser] = useState(false)

	const router = useRouter()

	function logout() {
		return signOut(auth)
	}

	function login() {
		return signIn()
	}

	useEffect(() => {
		onAuthStateChanged(auth, (current) => {
			if (current) {
				setIsLoadingUser(true)
				new Promise((resolve) => {
					setTimeout(() => {
						resolve(setCurrentUser(current))
					}, 1000)
				}).then(() => setIsLoadingUser(false))
				router.push('/dashboard')
			} else {
				setIsLoadingUser(true)
				new Promise((resolve) => {
					setTimeout(() => {
						resolve(setCurrentUser(current))
					}, 1000)
				}).then(() => setIsLoadingUser(false))
				router.push('/')
			}
		})
	})

	const values = {
		currentUser,
		auth,
		logout,
		login,
		isLoadingUser
	}

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
