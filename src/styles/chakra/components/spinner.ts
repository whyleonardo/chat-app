import { ComponentStyleConfig } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'

const { Spinner } = chakraTheme.components

const ThemedSpinner: ComponentStyleConfig = {
	...Spinner
}

export default ThemedSpinner
