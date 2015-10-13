Template.example2Demo.onCreated(function (){
  this.arg1 = new ReactiveVar("fizz");
  this.arg2 = new ReactiveVar("buzz");
});
Template.example2Demo.events({
  "keyup .dynamic": function (event, template) {
    var whichVar = event.target.id;
    var inputValue = template.$("#"+whichVar).val();
    template[whichVar].set(inputValue);
  }
});
Template.example2Demo.helpers({
  chainedServerCall: ReactivePromise(function () {
    var template = Template.instance();
    // Note: any reactive dependencies must be created in the initial call
    // of the function wrapped by ReactivePromise
    return Meteor.callPromise("add", template.arg1.get(), template.arg2.get())
      .then(function (result) {
        return Meteor.callPromise("add", "Server says: ", result);
      })
      .then(function (result) {
        return result + " :)";
      });
  })
});
