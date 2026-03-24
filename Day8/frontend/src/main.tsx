import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client/react'
import client from './apolloClient.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </StrictMode>,
)
