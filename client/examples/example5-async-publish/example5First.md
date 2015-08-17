{{#template name="example5First"}}
```js

function publish () {
  viewmodel = ViewModel.byId('example5Demo')
  viewmodel.publishInProgress(true)
  publishPost()
    .then(({publishedUrl, publishedRev}) => {
      viewmodel.publishedRev(publishedRev)
      //viewmodel setters return the value they just set, and
      //returning that value here will feed the next promise
      return viewmodel.publishedUrl(publishedUrl)
    })
    .then(makeShortUrl)
    .then(shortUrl => {
      viewmodel.shortUrl(shortUrl)
      return viewmodel.postText(viewmodel.postText().replace('{{|shortUrl}}', shortUrl))
    })
    .then((postText) => {
      //updatePost returns a Promise, which when returned from a Promise step,
      //will cause the next step to await its resolution
      return updatePost(postText, viewmodel.publishedUrl())
    })
    .then(({publishedUrl, publishedRev}) => {
      viewmodel.publishedRev(publishedRev)
      viewmodel.publishInProgress(false)
    })
}


function publishPost (postText) {
  return new Promise((resolve) =>
    setTimeout( ()=> {
      resolve({
        publishedUrl: "http://blog.com/post/" + new Mongo.ObjectID()._str,
        publishedRev: "b1bfc9022c2b43743976be9d"
      })
    }, 1000))
}

function updatePost (postText, publishedUrl) {
  return new Promise((resolve) =>
    setTimeout( ()=> {
      resolve({
        publishedUrl,
        publishedRev: new Mongo.ObjectID()._str
      })
    }, 1000))
}

function makeShortUrl (publishedUrl) {
  return new Promise((resolve) =>
    setTimeout( ()=> {
      resolve("http://bit.ly/" + publishedUrl.split('/')[4].substring(0,6))
    }, 1000))
}


```
{{/template}}
