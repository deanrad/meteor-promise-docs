let textDep = new ReactiveVar();
textDep.set("foo"); //initial value
Tracker.autorun(()=>{
  let textDepVal = textDep.get();
  console.log("Text Val", textDepVal);
})

Template.view.helpers({
  wordHelper() { return ["foo", "bar", "baz"]; },
  promiseHelper: getWrapped( v => {
    return new Promise(function(resolve) {
      setTimeout(()=>resolve(v + ":" + textDep.get()), 2500);
    })
  })
})

Template.view.events({
  "keyup #inputDep": (e, t) => textDep.set($(t.find("#inputDep")).val())
})
