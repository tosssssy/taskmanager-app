import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default App
