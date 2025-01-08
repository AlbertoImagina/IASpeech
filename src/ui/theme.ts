import { extendTheme, type ThemeConfig } from '@chakra-ui/react'


const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}


const theme = extendTheme({
  config,
  layerStyles: {
    // DEGRADADO BÁSICO DE LETRAS
    textGradient: {
      bgGradient: 'linear(to-l, #A052EE, #6645E7)',
      bgClip: "text"
    },
    // DEGRADADO BÁSICO DE BOTON
    buttonGradient: {
      bgGradient: 'linear(to-l, #A052EE, #6645E7)',
    },
    // ESTILO BASICO DE LINK
    textLink: {
      color:'white'
    }

  },
  textStyles: {
    primaryText: {
      fontSize: '24px',
      fontWeight: 'extrabold',
    },
  }
})

export default theme