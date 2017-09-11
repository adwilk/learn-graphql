[⬅️](exercise-0.md) [⬆️️](../README.md) [➡️](exercise-2.md)
---

### Exercise 1 - Express and Graph*i*QL

The goal is to learn use [express-graphql](https://github.com/graphql/express-graphql). `express-graphql` is express middleware that implements the basics for executing queries on an express server. It abstracts away the handling of requests and allows for both `GET` and `POST` requests. It also includes the [Graph*i*QL](https://github.com/graphql/graphiql#graphiql) which is an tool for interacting with your GraphQL server in the browser.

Replace the `graphql` dependency from exercise 0 with `express-graphql`.
You should be able to `POST` to your server with the following body:
```json
{
  "query": "{ hello }"
}
```

Add `graphiql: true` to the options passed to `express-graphql`.
You should see Graph*i*QL when you visit your server in a browser.
