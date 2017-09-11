import express from 'express';
import { makeExecutableSchema } from 'graphql-tools';
import graphqlHTTP from 'express-graphql';
import characters from './characters';
import axios from 'axios';
import DataLoader from 'dataloader';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
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

  type Geo {
    lat: Float!
    lng: Float!
  }

  type Address {
    street: String!
    suite: String!
    city: String!
    zipcode: String!
    geo: Geo!
  }

  type Company {
    name: String!
    catchPhrase: String!
    bs: String!
  }
  
  type User  {
    id: Int!
    name: String!
    username: String!
    email: String!
    address: Address!
    phone: String!
    website: String!
    company: Company!
    posts: [Post]
  }

  type Post {
    userId: Int!
    id: Int!
    title: String!
    body: String!
    user: User
  }

  type Queries {
    hello(name: String!): String
    sum(first: Int!, second: Int!): Int
    characters(nameContains: String): [Character]
    posts: [Post]
    post(id: Int!): Post
    users: [Post]
    user(id: Int!): User
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
    posts: (root, args, { dataLoader }) => dataLoader.load('/posts'),
    post: (root, { id }, { dataLoader }) => dataLoader.load(`/posts/${id}`),
    users: (root, args, { dataLoader }) => dataLoader.load('/users'),
    user: (root, { id }, { dataLoader }) => dataLoader.load(`/users/${id}`),
  },
  Post: {
    user: ({ userId }, args, { dataLoader }) => dataLoader.load(`/users/${userId}`),
  },
  User: {
    posts: ({ id }, args, { dataLoader }) => dataLoader.load(`/posts?userId=${id}`)
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

app.use('/', graphqlHTTP(() => ({
  schema,
  graphiql: true,
  context: {
    dataLoader: new DataLoader(
      urls => Promise.all(urls.map(url => get(url))),
      { batch: false },
    ),
  },
  formatError: (error) => {
    console.error(error);
    return error;
  },
})));

const host = process.env.IP || 'localhost';
const port = process.env.PORT || 8080;
app.listen(port, host, () => console.log(`🔗  http://${host}:${port}`));
