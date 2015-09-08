Meteor.methods({
  addSleep(x, y){
    //simulate latency
    Meteor.sleep(750);

    //allow more than one method to run concurrently
    this.unblock();
    return `${x} + ${y}`
  },
  add(x, y){
    this.unblock();
    return `${x} + ${y}`
  },
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
