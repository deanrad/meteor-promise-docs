{{#template name="example5Sync"}}
```js
  // Here we dont worry about using proper JS, or updating the viewmodel,
  // we just sketch out the outline of the method
  inProgress = true
  postText = 'placeholder text'
  {pubLoc, pubRev} = publishPost(postText)
  shortUrl = shorten(pubLoc)
  postText = mergePost({shortUrl})
  {pubLoc, pubRev} = updatePost(postText, pubLoc)
  inProgess=false

```
{{/template}}
