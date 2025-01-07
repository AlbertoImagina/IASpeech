import { extendTheme, type ThemeConfig } from '@chakra-ui/react'


const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  layerStyles: {
    baseText: {
      bgGradient:'linear(to-l, #A052EE, #6645E7)',
      bgClip:'text',
    },
  }
});

export default theme;


