Template.example1Demo.onCreated(function (){
  this.arg1 = new ReactiveVar("foo");
  this.arg2 = new ReactiveVar("bar");
});

Template.example1Demo.helpers({
  serverCallWithLatency: ReactivePromise(function (field1, field2) {
    var template = Template.instance(),
      value1 = template[field1].get(),
      value2 = template[field2].get();

    var promise =  Meteor.callPromise("addSleep", value1, value2);
    return promise;
  }, "loading...")
});

// set the ReactiveVars on keyup events
Template.example1Demo.events({
  "keyup .dynamic": function (event, template) {
    var whichVar = event.target.id;
    var inputValue = template.$("#"+whichVar).val();
    template[whichVar].set(inputValue);
  }
});
