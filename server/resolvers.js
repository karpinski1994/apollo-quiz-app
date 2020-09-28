const { AuthenticationError } = require('apollo-server');
const faker = require('faker');
const JsonWebToken = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');

const jwtSecret = '34%%##@#FGFKFL';

const isTokenValid = token => {
  const bearerToken = token.split(' ');

  if (bearerToken) {
    return JsonWebToken.verify(bearerToken[1], jwtSecret, error => {
      if (error) {
        return false;
      }

      return true;
    });
  }

  return false;
};

const mockCategory = () => ({
  id: faker.random.number,
  title: faker.commerce.department,
});

const mockProduct = (id = false) => ({
  id: id || faker.random.number,
  title: faker.commerce.productName,
  thumbnail: faker.image.imageUrl(
    400,
    400,
    faker.random.arrayElement(['animals', 'nature', 'cats']),
  ),
  price: faker.commerce.price(),
  category: mockCategory(),
});

let deck = {
  total: 0,
  products: [],
  complete: false,
};

const resolvers = {
  Query: {
    product: () => mockProduct(),
    products: (_, { limit = 10 }) =>
      Array.from(Array(limit), () => mockProduct()),
    categories: (_, { limit = 10 }) =>
      Array.from(Array(limit), () => mockCategory()),
    deck: () => deck,
  },
  Mutation: {
    addToDeck: (_, { id }) => {
      deck = {
        ...deck,
        total: deck.total + 1,
        products: [...deck.products, mockProduct(id)],
      };

      return deck;
    },
    completeDeck: (_, {}, { token }) => {
      const isValid = token ? isTokenValid(token) : false;

      if (isValid) {
        deck = {
          ...deck,
          complete: true,
        };

        return deck;
      }
      throw new AuthenticationError(
        'Please provide (valid) authentication details',
      );
    },
    loginUser: async (_, { userName, password }) => {
      let isValid;
      const user = {
        userName: 'test',
        password:
          '$2b$10$5dwsS5snIRlKu8ka5r7z0eoRyQVAsOtAZHkPJuSx.agOWjchXhSum',
      };

      if (userName === user.userName) {
        isValid = await Bcrypt.compareSync(password, user.password);
      }

      if (isValid) {
        const token = JsonWebToken.sign({ user: user.userName }, jwtSecret, {
          expiresIn: 3600,
        });
        return {
          userName,
          token,
        };
      }
      throw new AuthenticationError(
        'Please provide (valid) authentication details',
      );
    },
  },
};

module.exports = resolvers;
