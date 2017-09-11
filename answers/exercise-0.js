import express from 'express';
import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

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

app.use('/', (req, res) => {
  graphql({
    schema,
    source: req.query.query
  })
  .then(result => res.status(200).json(result))
  .catch(error => res.status(500).json(error));
});

app.listen(process.env.PORT || 8080, process.env.IP || '0.0.0.0');
