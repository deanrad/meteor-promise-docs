# Right now, the function returned by getWrapped has one promise no matter
# which args its called with. I suppose we have to have it:
# a) by default, have different promises/values/completionStates keyed on args
# b) tear down and recreate those upon our being invalidated
# c) do some other stuff - probably should TDD this before it gets too messy!!

# Thus we want the set of promises to be
# a) keyed on the args to the inner function (aka helper args)
# b) regenerated when reactive dependencies change

@getWrapped = (fn) ->
  do (promise=null, isResolved=null, value=null) ->
    (args..., spacebars) ->
      console.log "obtaining promise for:", args

      helperComputation = Tracker.currentComputation
      if promise then return value
      result = fn.apply({}, args)
      if result instanceof Promise
        promise = result
        return promise.then (v) ->
          console.log "promise resolved"
          helperComputation.invalidate()
          isResolved = true
          value = v
      else
        result

fn = (arg1, others...)->
  new Promise (resolve) ->
    setTimeout resolve.bind({}, "Yay:"+arg1), 2000

@fnw = getWrapped(fn)
