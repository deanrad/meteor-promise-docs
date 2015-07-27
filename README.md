# Async/await + Promises + Meteor.call = awesome!

## TL;DR
After doing initial work on a Meteor package: [`deanius:promise`](http://github.com/deanius/deanius-meteor-promise) , I decided to investigate how to further abstract away Promises so it feels almost as natural and callback-free as it can be. Here's the current state of my investigation.

This project shows the **potential** awesomeness that results from using ES7 `async/await` commands with the `deanius:promise` package that provides a promise for the result of `Meteor.call`.

Example:
```js
// Given this method in server/methods.es6.js
Meteor.methods({
  add(x, y){ return x+y }
})


// You can call this method in a sync way as follows
// 1. Define this function in test.es6.js - note async/await
AwesomeAdd = async function (a, b) {
  var result = await Meteor.call("add", a, b);
  console.log("Awesome result", result);
  return result;
}

// 2. invoke this in the browser console
> AwesomeAdd(2,3)
⋖ Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
Awesome result 5

// 3. Voila!

```
Cool! So what happened ?
  1. The Promise for the result was returned
  2. The promise resolved, printing the console.log statement with the result
  3. FTW!

```js

> AwesomeAdd(AwesomeAdd(2,3), 1)
⋖ Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
Awesome result 5
Awesome result [object Object]1  

// You can't simply compose without 'awaiting', we're seeing the result
// of a promise.toString() added to "1"

//but, in a true 'async' fn
ComposedAdd = async function(a, b, c) {
  var result1 = await AwesomeAdd(a, b)
  var result2 = await AwesomeAdd(result1, c)
  return result2
}

ComposedAdd(1,2,3)
⋖ Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
Awesome result 3
Awesome result 6 /// yeah!


```

So, there are still some challenges with combining/composing promises, but I'm excited that:

  1. We can use `async/await` syntax today to appear to synchronously wait on a Promise
  2. This functionality is client/server, so we will stay isomorphic


# Open Questions

  1. Will this work in reactive data context, i.e. helpers??
  2. What is the reason they don't compose, and is there a solution?
