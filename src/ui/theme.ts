import { extendTheme, type ThemeConfig } from '@chakra-ui/react'


const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}


const theme = extendTheme({
  config,
  layerStyles: {
    textGradient: {
      bgGradient:"linear(to-r, #4F46E5 0%, #9333EA 31.39%)",
      bgClip: "text"
    },
    buttonGradient: {
      bgGradient: "linear(to-r, #6366F1 0%, #A855F7 100%)",
      color: 'white'
    }
  },
  semanticTokens: {
    colors: {
      error: 'red.500',
      text: {
        default: 'black',
        _dark: 'white',
      },
      icon: '#A12DFF',
      disabled: '#9CA3AF',
      buttonIcon: 'white',
      backgroundModal: '#1D222D',
      purple: {
        100: "#A052EE",
        200: "#9A4FEA", 
        300: "#934CEE",
        400: "#8C4AE9",
        500: "#854BE7",
        600: "#7E48E5",
        700: "#7747E2",
        800: "#7046E9",
        900: "#6645E7"
      },
    },
  },
})

export default theme