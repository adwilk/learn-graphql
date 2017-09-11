[⬅️](exercise-1.md) [⬆️️](../README.md) [➡️](exercise-3.md)
---

### Exercise 2 - Arguments

Goal:
Learn to make more dynamic resolvers by [executing](http://graphql.org/learn/execution/) queries with [arguments](http://graphql.org/learn/queries/#arguments).

At the end of this excercise, your graphql server should be able to take three different queries:

* hello
  - Takes a name argument, and responds with a greeting for whichever name is provided e.g. "hello Jon Snow!"
* sum
  - Takes two integer arguments and responds with the sum
* characters
  - Takes a string argument, and responds with a list of Game of Thrones characters whose names contain the provided string.
  - The characters.json file at the root of this project will be needed.
  - Hint: You will need to define a new type for this one.

Use graphiql to test your resolvers independently or all at once. Here is a sample query:

```
{
  hello(name: "Jon Snow")
  sum(first: 20, second: 22)
  characters(nameContains: "Stark") {
    name
    gender
    alive
  }
}
```