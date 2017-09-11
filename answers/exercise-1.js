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

const host = process.env.IP || 'localhost';
const port = process.env.PORT || 8080;
app.listen(port, host, () => console.log(`🔗  http://${host}:${port}`));
