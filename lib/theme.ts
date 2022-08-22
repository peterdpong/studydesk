// Note to self: In the future to expand the theme, create a theme directory to hold theme overrides.

import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    fonts: {
        heading: 'DM Sans',
        body: 'DM Sans'
    }
})

export default theme