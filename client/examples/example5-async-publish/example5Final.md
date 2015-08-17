{{#template name="example5Final"}}
```js
// Each property of the viewmodel is like a ReactiveVar, bound to a DOM element
Template.example5Demo.viewmodel('example5Demo', {
  publishedUrl: "",
  publishedRev: "",
  shortUrl: "",
  publishInProgress: false,
  postText: `
# My Awesome Post

View online at: {{|shortUrl}}

TODO: write
`
})

Template.example5Demo.events({
  "click #publishPost": () => publish(),
  "click #reset": () => ViewModel.byId('example5Demo').reset()
})

function publish () {
  viewmodel = ViewModel.byId('example5Demo')
  viewmodel.publishInProgress(true)
  upsertPost()
    .then(({publishedUrl, publishedRev}) => {
      viewmodel.publishedRev(publishedRev)
      //viewmodel setters return the value they just set, and
      //returning that value here will feed the next promise
      return viewmodel.publishedUrl(publishedUrl)
    })
    .then(getShortUrl)
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
        publishedUrl: "http://blog.com/post/b1bfc9022c2b43743976be9d",
        publishedRev: new Mongo.ObjectID()._str
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

function getShortUrl (publishedUrl) {
  if (viewmodel.shortUrl() == '') {
    return makeShortUrl(publishedUrl)
  }
  else {
    return Promise.resolve(viewmodel.shortUrl())
  }
}

```
{{/template}}
