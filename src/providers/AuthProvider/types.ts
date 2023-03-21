import { Auth, User } from 'firebase/auth'

export interface AuthValueProps {
	auth: Auth
	logout: () => Promise<void>
	currentUser: User | null | undefined
	login: () => Promise<void>
	isLoadingUser: boolean
}
