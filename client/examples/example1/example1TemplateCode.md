{{#template name="example1TemplateCode"}}
```js
Template.example1Demo.onCreated(function (){
  this.arg1 = new ReactiveVar("foo");
  this.arg2 = new ReactiveVar("bar");
});
Template.example1Demo.events({
  "keyup .dynamic": function (event, template) {
    var whichVar = event.target.id;
    var inputValue = template.$("#"+whichVar).val();
    template[whichVar].set(inputValue);
  }
});
Template.example1Demo.helpers({
  serverCallWLatency: ReactivePromise(function () {
    var template = Template.instance();
    var promise =  Meteor.promise("addSleep", template.arg1.get(), template.arg2.get());
    return promise;
  }, "loading...")
});

```
{{/template}}
