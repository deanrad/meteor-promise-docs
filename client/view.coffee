@textDep = new ReactiveVar
textDep.set "foo" #initial value

Template.view.helpers
  wordHelper: ["foo", "bar"]

  regularHelper: PromiseHelper (v) ->
    "nonpromised " + v + ":" + textDep.get()

  promiseHelper: PromiseHelper (v) ->
    # note reactive deps must be in the earliest call..
    Meteor.promise("add", v, "textDep:" + textDep.get())
      .then (v) ->
        Meteor.promise "add", v, "date:" + new Date()
      .then (v) ->
        Meteor.promise("add", v, "and winning !")
    # s = v + ":" + textDep.get()
    #
    # return new Promise (resolve) ->
    #   setTimeout ->
    #     resolve s+':promise'
    #   , 1000 + Math.random()*2000


Template.view.events
  "keyup #inputDep": (e, t) -> textDep.set(t.$("#inputDep").val())
