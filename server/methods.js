Meteor.methods({
  addSleep(x, y){
    //simulate latency
    Meteor.sleep(750);

    //allow more than one method to run concurrently
    this.unblock();
    console.log('in add')
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
  },
  futureTime() {
    let actions = new Promise((resolve) =>
        setTimeout(()=> resolve(new Date), 5000))
      .then(logAndReturn)
      .catch(logAndReturn);
    return Promise.await(actions);
  }
})

var logAndReturn = (value) => {
  console.log("The value returned is:", value);
  return value;
}
