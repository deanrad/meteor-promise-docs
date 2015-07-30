Meteor.methods({
  add(x, y){
    Meteor.sleep(750);
    return `${x} + ${y}`
  }
})
