aBitLater = (fn, delay) => new Promise(resolve => {
    setTimeout(()=>resolve(fn.call()), delay)
})

Template.example3Demo.events({
  'click #triggerPromise': function (event, template) {
    // Note the necessary * after the word function, which makes the function a generator
    Meteor.runAsync(function* () {
       var out1 = yield Meteor.callPromise("add", "1", "2")
       var out2 = yield aBitLater(() => 3, 500)
       var result = yield Meteor.callPromise("add", out1, out2);
       console.log("Async is done.", result);
       return result;
    }).then(result => template.$("#promiseOutput").html(result))
    // ^ runAsync returns a Promise for the eventually returned value of the function
  }
})
