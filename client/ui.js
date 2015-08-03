Template.explanation.onCreated(function (){
  this.arg1 = new ReactiveVar("foo");
  this.arg2 = new ReactiveVar("bar");
  this.arg3 = new ReactiveVar("fizz");
  this.arg4 = new ReactiveVar("buzz");
});
Template.explanation.events({
  "keyup .dynamic": function (event, template) {
    var whichVar = event.target.id;
    var inputValue = template.$("#"+whichVar).val();
    template[whichVar].set(inputValue);
  }
});

Template.explanation.helpers({
  concatenatedArgs: ReactivePromise(function (field1, field2) {
    var template = Template.instance();
    var promise = Meteor.promise("addSleep", template[field1].get(), template[field2].get());
    return promise;
  }, "loading..."),
  concatenatedArgsPost: ReactivePromise(function (field1, field2) {
    var template = Template.instance();
    var promise = Meteor.promise("add", template[field1].get(), template[field2].get());
    return promise.then(function(result){
      return "Server says: " + result;
    }).then(function(result){
      return result + " :)"
    })
  }, "loading...")

});

// Save a reference to the promise's resolve function, since it is
// only visible while the promise is being constructed
var resolveUserFavorite = null;

Template.explanation.onCreated(function () {
  this.userFavoriteNumber = new Promise(function (resolve) {
    resolveUserFavorite = resolve;
  })
});
Template.explanation.events({
  "click .submitFavorite": function (event, template) {
    resolveUserFavorite(template.$("#favoriteNumber").val());
  }
})
Template.explanation.helpers({
  userFavoriteNumber: ReactivePromise(function(){
    var promise = Template.instance().userFavoriteNumber;
    return promise
      .then(function (val){ return Meteor.promise("add", val, " :)")})
      .then(function (val){
        // a promise is a one-time, so disable after resolved
        $("#favoriteNumber").first().prop('disabled', true).css('background-color', '#ddd');
        return val;
    });
  })
});
