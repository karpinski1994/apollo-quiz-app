import gql from 'graphql-tag';

export const GET_DECK_TOTAL = gql`
  query getDeckTotal {
    deck {
      total
    }
  }
`;

export const GET_DECK = gql`
  query getDeck {
    deck {
      total
      products {
        id
        title
        price
        category {
          id
          title
        }
      }
    }
  }
`;

export const ADD_TO_DECK = gql`
  mutation addToDeck($productId: Int!) {
    addToDeck(input: {productId: $productId}) {
      total
    }
  }
`;
export const GET_LIMIT = gql`
  query getLimit {
    limit @client
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($limit: Int) {
    products(limit: $limit) {
      id
      title
      thumbnail
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($userName: String!, $password: String!) {
    loginUser(userName: $userName, password: $password) {
      userName
      token
    }
  }
`;
