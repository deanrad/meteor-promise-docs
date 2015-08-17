{{#template name="example5Template"}}
```html
  <div>
    <textarea name="postText" rows="5" cols="60" data-bind="text: postText"></textarea>
    <br>
    published Url: <span data-bind="text: publishedUrl"></span><br>
    published Rev: <span data-bind="text: publishedRev"></span><br>
    bitly Url: <span data-bind="text: shortUrl"></span><br>
  </div>
  <div>
    <button id="publishPost" data-bind="enabled: !publishInProgress">Publish Post</button>
    <button id="reset">Reset</button>
  </div>
```
{{/template}}
