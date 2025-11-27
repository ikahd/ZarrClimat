import { ThemeUIProvider } from 'theme-ui'
import theme from '@carbonplan/theme'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function App({ Component, pageProps }) {
  return (
    <ThemeUIProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeUIProvider>
  )
}