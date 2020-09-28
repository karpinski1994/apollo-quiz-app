import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {Route, Switch, Redirect} from 'react-router-dom';

import {ApolloProvider, ApolloClient} from '@apollo/client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloLink} from 'apollo-link';
import {withClientState} from 'apollo-link-state';
import { setContext } from 'apollo-link-context'
import Header from './Header/Header';
import Products from './Products/Products';
import Deck from './Deck/Deck';
import Checkout from './Checkout/Checkout';
import Login from './Checkout/Login';

const isAuthenticated = sessionStorage.getItem('token');

const link = createHttpLink({uri: 'http://localhost:4000/graphql'});
// This is the same cache you pass into new ApolloClient

const authLink = setContext((_, { headers }) => {
  const token = isAuthenticated;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const cache = new InMemoryCache();


const stateLink = withClientState({
  cache,
  resolvers: {},
  typeDefs: `
    extend type Query {
      limit: Int!
    }
  `,
});

cache.writeData({
  data: {
    limit: 5,
  },
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, authLink.concat(link)]),
});

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <AppWrapper>
      <Header />
      <Switch>
        <Route exact path='/' component={Products} />
        <Route path='/deck' component={Deck} />
        <Route
          path='/checkout'
          render={(props) =>
            isAuthenticated ? (
              <Checkout props={props} />
            ) : (
              <Redirect to='/login' />
            )
          }
        />
        <Route path='/login' component={Login} />
      </Switch>
    </AppWrapper>
  </ApolloProvider>
);

export default App;
