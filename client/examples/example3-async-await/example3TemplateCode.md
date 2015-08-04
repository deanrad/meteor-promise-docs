{{#template name="example3TemplateCode"}}
```js
Template.example3Demo.events({
  'click #triggerPromise': async function (event, template) {
    // use 'await' inside a function marked 'async' in order to
    // directly use the resolved value of a promise
    var output = await Meteor.promise("add", "1", "2");
    template.$("#promiseOutput").html(output);
  }
});
```
{{/template}}
