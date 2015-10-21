{{#template name="exports"}}
# deanius:promise API

The *deanius:promise* package gives you the following functionality:

  - [`Meteor.callPromise`](#call-promise) - The same as Meteor.call, but you omit the callback parameter, and it returns a `Promise` for the result
  - [`Meteor.runAsync`](#run-async) - Uses the [co NPM Library](https://www.npmjs.com/package/co) to run a JavaScript generator function yielding promises, as though it were synchronous
  - [`HTTP.getPromise`](#http) - All methods on the HTTP object will have Promise-returning versions, just append `Promise` onto the method name.
  - `Meteor.subscribe` - The object returned by `Meteor.subscribe` will have a `readyPromise()` function which, when called, returns a Promise that resolves when `ready()` returns `true`.
  - `Meteor.wrapPromise` - Takes *any* callback-style function, and returns a Promise-returning function. This is like Meteor.wrapAsync, but useful on the client.
  - `ReactivePromise` - A function to wrap Promise-returning functions with, to create reactive functions - such as helpers - which update when their promised value becomes available.

The APIs fully specified in the [test suite](http://github.com/deanius/meteor-promise/tree/master/tests/), and below are examples showing how to use the entire API exposed by this package.
{{/template}}
