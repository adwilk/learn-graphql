import express from 'express';
import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

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

const host = process.env.IP || 'localhost';
const port = process.env.PORT || 8080;
app.listen(port, host, () => console.log(`🔗  http://${host}:${port}`));
