import express from 'express';
import { makeExecutableSchema } from 'graphql-tools';
import graphqlHTTP from 'express-graphql';
import characters from '../characters';

const typeDefs = `
  schema {
    query: Queries
  }

  type Character {
    name: String!
    gender: String!
    alive: Boolean!
  }
  
  type Queries {
    hello(name: String!): String
    sum(first: Int!, second: Int!): Int
    characters(nameContains: String): [Character]
  }
`;

const resolvers = {
  Queries: {
    hello: (root, { name }) => `hello ${name}!`,
    sum: (root, { first, second }) => first + second,
    characters: (root, { nameContains }) => {
      if (nameContains) {
        return characters.filter(({ name }) =>
          name.toLowerCase().includes(nameContains.toLowerCase())
        );
      }
      return characters;
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

app.use('/', graphqlHTTP({
  schema,
  graphiql: true,
  formatError: (error) => {
    console.error(error);
    return error;
  },
}));

app.listen(process.env.PORT || 8080, process.env.IP || '0.0.0.0');
