{{#template name="example4Method"}}
```js
Meteor.methods({
  serverPromise(){
    //construct a Promise that will take 2500ms to resolve
    console.log("began running")
    let promise = new Promise((resolve)=>
      setTimeout(()=>{
        console.log("done running")
        resolve("I'm baaaack....")}, 2500))
    return Promise.await(promise);
  }
})
```
{{/template}}
