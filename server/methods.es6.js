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
  }
})
