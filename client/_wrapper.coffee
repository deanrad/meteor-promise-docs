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
