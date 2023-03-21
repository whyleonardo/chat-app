import { ComponentStyleConfig } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'

const { Avatar } = chakraTheme.components

const ThemedAvatar: ComponentStyleConfig = {
	...Avatar
}

export default ThemedAvatar
