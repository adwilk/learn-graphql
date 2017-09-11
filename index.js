import express from 'express';
import { makeExecutableSchema } from 'graphql-tools';
import graphqlHTTP from 'express-graphql';
import characters from './characters';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://jsonplaceholder.typicode.com',
});

const get = url => client.get(url)
  .then(({ data }) => data);

const typeDefs = `
  schema {
    query: Queries
  }

  type Character {
    name: String!
    gender: String!
    alive: Boolean!
  }

  type Post {
    userId: Int!
    id: Int!
    title: String!
    body: String!
  }

  type Queries {
    hello(name: String!): String
    sum(first: Int!, second: Int!): Int
    characters(nameContains: String): [Character]
    posts: [Post]
    post(id: Int!): Post
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
    posts: () => get('/posts'),
    post: (root, { id }) => get(`/posts/${id}`),
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

const host = process.env.IP || 'localhost';
const port = process.env.PORT || 8080;
app.listen(port, host, () => console.log(`🔗  http://${host}:${port}`));
