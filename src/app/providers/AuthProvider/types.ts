import { Auth, User } from 'firebase/auth'

export interface AuthValueProps {
	auth: Auth
	logout: () => Promise<void>
	currentUser: User | undefined
	login: () => Promise<void>
}
