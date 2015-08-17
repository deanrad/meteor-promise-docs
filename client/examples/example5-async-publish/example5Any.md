{{#template name="example5Any"}}
```js

publish = function publish () {
  viewmodel = ViewModel.byId('example5Demo')
  viewmodel.publishInProgress(true)
  upsertPost()  // <<<<<<<<----------- upsert, not publish
    .then(({publishedUrl, publishedRev}) => {
      viewmodel.publishedRev(publishedRev)
      return viewmodel.publishedUrl(publishedUrl)
    })
    .then(upsertShortUrl)  // <<<<<<<<----------- upsert, not make
    .then(shortUrl => {
      viewmodel.shortUrl(shortUrl)
      return viewmodel.postText(viewmodel.postText().replace('{{shortUrl}}', shortUrl))
    })
    .then((postText) => {
      return updatePost(postText, viewmodel.publishedUrl())
    })
    .then(({publishedUrl, publishedRev}) => {
      viewmodel.publishedRev(publishedRev)
      viewmodel.publishInProgress(false)
    })
}

// Returning a resolved promise is how to return data 'synchronously'
// without breaking callers which expect to be able to call 'then'
function upsertPost (postText, publishedUrl) {
  if (viewmodel.publishedUrl() == '') {
    return publishPost(postText, publishedUrl)
  }
  else {
    return Promise.resolve({
      publishedUrl: viewmodel.publishedUrl(),
      publishedRev: viewmodel.publishedRev()
    })
  }
}

function upsertShortUrl (publishedUrl) {
  if (viewmodel.shortUrl() == '') {
    return makeShortUrl(publishedUrl)
  }
  else {
    return Promise.resolve(viewmodel.shortUrl())
  }
}



```
{{/template}}
