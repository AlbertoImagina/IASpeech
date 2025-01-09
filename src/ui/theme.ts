import { extendTheme, type ThemeConfig } from '@chakra-ui/react'


const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const breakpoints = {
  base: '200px',
  sm: '220px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}


const theme = extendTheme({
  config,
  breakpoints,
  layerStyles: {
    textGradient: {
      bgGradient:"linear(to-r, #4F46E5 0%, #9333EA 31.39%)",
      bgClip: "text"
    },
    buttonGradient: {
      bgGradient: "linear(to-r, #6366F1 0%, #A855F7 100%)",
      textColor: '#FFFFFF'
    }
  },
  semanticTokens: {
    colors: {
      error: '#F56565',
      text: {
        light: '#000000',
        _dark: '#FFFFFF',
      },
      text_green: '#F0FDF4',
      border_green: '#3C8557',
      icon: '#A12DFF',
      disabled: '#9CA3AF',
      backgroundModal: {
        light: '#FFFFFF',
        _dark: '#1D222D',
      },
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