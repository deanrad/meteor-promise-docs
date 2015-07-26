//https://github.com/grigio/meteor-babel/blob/master/tests/basic_test.es6.js

AwesomeAdd = async function (a, b) {
  var result = await Meteor.call("add", a, b);
  console.log("Awesome result", result);
}

ComposedAdd = async function(a, b, c) {
  var result1 = await AwesomeAdd(a, b)
  var result2 = await AwesomeAdd(result1, c)
  return result2
}

/* TODO - does this work in a reactive context (eg helper function?)
   If not, why not??
*/
