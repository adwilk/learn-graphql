[⬅️](exercise-2.md) [⬆️️](../README.md) [➡️](exercise-4.md)
---

### Exercise 3 - Fetching Data

The goal of this exercise is to add the ability of retrieving data asynchronously from an API. Use the [axios](https://github.com/mzabriskie/axios) library to hit the [JSON placeholder API](https://jsonplaceholder.typicode.com/). You should be able to retrieve all *posts* from `/posts`, and a *single post* from `/posts/:id`.

At the end of this exercise you should be able to hit your server with the following 2 queries and get successful responses.

```
{
	posts {
		userId
    	id
    	title
    	body
	}
}
```

```
{
	post (id: 1) {
		userId
    	id
    	title
    	body
	}
}
```