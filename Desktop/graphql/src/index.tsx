import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Routers from "./Routes";

const client = new ApolloClient({
  uri: "http://10.2.1.100:8000/graphql/",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routers />
  </ApolloProvider>,
  document.getElementById("root")
);
