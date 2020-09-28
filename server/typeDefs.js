const { gql } = require('apollo-server');

const typeDefs = gql`
  type Product {
    id: Int!
    title: String!
    thumbnail: String!
    price: Float
    category: Category
  }
  type Category {
    id: Int!
    title: String!
  }
  type User {
    userName: String!
    token: String!
  }
  type Deck {
    total: Float
    products: [Product]
    complete: Boolean
  }
  input DeckInput {
    productId: Int!
  }
  type Query {
    product: Product
    products(limit: Int): [Product]
    categories: [Category]
    deck: Deck
  }
  type Mutation {
    addToDeck(input: DeckInput!): Deck
    completeDeck: Deck
    loginUser(userName: String!, password: String!): User
  }
`;

module.exports = typeDefs;
