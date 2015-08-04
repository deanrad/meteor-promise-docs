{{#template name="example1Method"}}
```js
Meteor.methods({
  addSleep: function (x, y) {
    Meteor.sleep(750);
    return x + " + " + y;
  }
})
```
{{/template}}
