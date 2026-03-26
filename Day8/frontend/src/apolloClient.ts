import { ApolloClient, InMemoryCache} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs"

// const httpLink = new HttpLink({
//   uri: "http://localhost:3000/graphql",
// });

const uploadLink = new UploadHttpLink({
  uri: "http://localhost:3000/graphql",
})

const authLink = new SetContextLink(({ headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

export default client;
