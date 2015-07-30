@textDep = new ReactiveVar
textDep.set "foo" #initial value

Template.view.helpers
  wordHelper: ["foo", "bar"]

  promiseHelper: PromiseHelper (v) ->
    s = v + ":" + textDep.get()

    return new Promise (resolve) ->
      setTimeout ->
        resolve s+':promise'
      , 1000 + Math.random()*2000

  regularHelper: PromiseHelper (v) ->
    return "nonpromised " + v + ":" + textDep.get()

Template.view.events
  "keyup #inputDep": (e, t) -> textDep.set(t.$("#inputDep").val())
