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
	const [currentUser, setCurrentUser] = useState<User>()

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
				setCurrentUser(current)
				router.push('/dashboard')
			} else {
				router.push('/')
			}
		})
	}, [])

	const values = {
		currentUser,
		auth,
		logout,
		login
	}

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
