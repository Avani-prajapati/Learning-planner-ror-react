import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client/react";
import client from "./apolloClient.ts";
import { ArticleProvider } from "./contexts/ArticleContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider value={defaultSystem}>
        <AuthProvider>
          <ArticleProvider>
            <App />
          </ArticleProvider>
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  </StrictMode>,
);
