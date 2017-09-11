import express from 'express';
import { makeExecutableSchema } from 'graphql-tools';
import graphqlHTTP from 'express-graphql';

const typeDefs = `
  schema {
    query: Queries
  }
  
  type Queries {
    hello: String
  }
`;

const resolvers = {
  Queries: {
    hello: () => 'hello world!',
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
