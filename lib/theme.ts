// Note to self: In the future to expand the theme, create a theme directory to hold theme overrides.

import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'DM Sans',
    body: 'DM Sans',
  },
  colors: {
    brand: {
      primary: '#0057FF',
      primary_hover: '#2D74FF',
    },
  },
})

export default theme
