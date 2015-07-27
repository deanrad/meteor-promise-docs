@getWrapped = (fn) ->
  do (promise=null, isResolved=null, value=null) ->
    (args..., spacebars) ->
      helperComputation = Tracker.currentComputation
      if promise then return value
      result = fn()
      if result instanceof Promise
        promise = result
        return promise.then (v) ->
          console.log "promise resolved"
          helperComputation.invalidate()
          isResolved = true
          value = v
      else
        result

fn = ->
  new Promise (resolve) ->
    setTimeout resolve.bind({}, 7), 2000

@fnw = getWrapped(fn)
