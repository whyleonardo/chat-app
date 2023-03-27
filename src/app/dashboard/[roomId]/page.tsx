export default function RoomPage({ params }: { params: { roomId: string } }) {
	console.log(params)
	return (
		<div>
			<p> {params.roomId} </p>
		</div>
	)
}
