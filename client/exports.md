{{#template name="exports"}}
# deanius:promise API

The *deanius:promise* package gives you the following functionality:

  - `Meteor.promise` - The same as `Meteor.call`, but you omit the callback parameter, and it returns a `Promise` for the result
  - `ReactivePromise` - A function to wrap Promise-returning functions with, to create reactive functions - such as helpers - which update when their promised value becomes available.

The APIs fully specified in the [test suite](http://github.com/deanius/meteor-promise/tree/master/tests/).

Below are examples which utilize the entire API exposed by this package, as well as a few examples
which show alternative ways to utilize Promises or Async with Meteor - the "Prior Art", if you will.
{{/template}}
