[⬅️](exercise-3.md) [⬆️️](../README.md)
---

### Exercise 4 - Data Caching

The goal of this exercise is to cache API calls in order to prevent duplicate calls, and and the first line of defense against cyclical query attacks. In order to achieve this you will need to learn to use the GraphQL context value, [DataLoader](https://github.com/facebook/dataloader) and usage of resolvers outside the Queries type.

Add a context value to your schema as outlined in the [express-graphql docs](https://github.com/graphql/express-graphql#options), which is generated each time a request is made.

To cache API calls you will be use DataLoader which is good for batching and caching data. For our use case we only care about its caching feature. You will need to implement a DataLoader that fetches from the API and add it to your context object. *hint- add logging to your DataLoader implementation so you can see what requests actually get made.*

Add types and resolvers to your schema so that the following query is valid and only makes two API calls.

```
{
  user(id:1) {
    name
    posts {
      title
      user {
        name
        posts {
          title
        }
      }
    }
  }
}
```