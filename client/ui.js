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
  concatenatedArgs: PromiseHelper(function (field1, field2) {
    var template = Template.instance();
    var promise = Meteor.call("addSleep", template[field1].get(), template[field2].get());
    return promise;
  }),
  concatenatedArgsPost: PromiseHelper(function (field1, field2) {
    var template = Template.instance();
    var promise = Meteor.call("add", template[field1].get(), template[field2].get());
    return promise.then(function(result){
      return "Server says: " + result;
    }).then(function(result){
      return result + " :)"
    })
  })

});
