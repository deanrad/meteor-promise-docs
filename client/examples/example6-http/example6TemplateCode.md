{{#template name="example6TemplateCode"}}
```js
Template.example6Demo.events({
  'click #triggerOkHTTP'() {
    //this URL has an 'Access-Control-Allow-Origin' header
    HTTP.getPromise("https://s3.amazonaws.com/www.deanius.com/robots.txt")
      .then(response => $("#http-ok-result").val(response.content))
      .catch(err => $("#http-err-result").val(err))
  },
  'click #triggerErrHTTP'() {
    //this URL, like most URLs, has no 'Access-Control-Allow-Origin' header, so will fail
    HTTP.getPromise("https://www.google.com/robots.txt")
      .then((response) => $("#http-ok-result").val(response.content))
      .catch(err => $("#http-err-result").val(err) && console.log(err))
  }
})
```
{{/template}}
