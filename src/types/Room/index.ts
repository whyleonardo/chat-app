export type Room = {
	createdAt: string
	admin: string[]
	creatorName: string
	creatorId: string
	roomId: string
	members: string[]
	name: string
}

export type Message = {
	text: string
	timestamp: string
	sender: string
}
