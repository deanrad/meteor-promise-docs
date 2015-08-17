// Each property of the viewmodel is a reactive var, but its property is
// automatically updated by DOM events on the element it is bound to.
Template.example5Demo.viewmodel('example5Demo', {
  publishedUrl: "",
  publishedRev: "",
  shortUrl: "",
  publishInProgress: false,
  postText: `# My Awesome Post

View online at: {{shortUrl}}

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
      //returning the value from here will feed the next promise with the publishedUrl
      return viewmodel.publishedUrl(publishedUrl)
    })
    .then(upsertShortUrl)
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

function upsertShortUrl (publishedUrl) {
  if (viewmodel.shortUrl() == '') {
    return makeShortUrl(publishedUrl)
  }
  else {
    return Promise.resolve(viewmodel.shortUrl())
  }
}

// sync version of code
/*
  inProgress = true
  postText = mergePost({shortUrl})
  {pubLoc, pubRev} = publishPost(postText)
  shortUrl = shorten(pubLoc)
  postText = mergePost({shortUrl})
  {pubLoc, pubRev} = updatePost(postText)
  inProgess=false
*/
