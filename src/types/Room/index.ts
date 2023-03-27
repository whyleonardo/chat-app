export type Room = {
	createdAt: string
	admin: string[]
	creatorName: string
	creatorId: string
	roomId: string
	members: string[]
	name: string
	messages: Array<{
		text: string
		timestamp: string
		sender: string
	}>
}
