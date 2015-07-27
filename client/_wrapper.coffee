@getWrapped = (fn) ->
  do (promise=null, isResolved=null, value=null) ->
    () ->
      if promise then return value
      result = fn()
      if result instanceof Promise
        promise = result
        return promise.then (v) ->
          console.log "promise resolved"
          isResolved = true
          value = v
      else
        result

fn = ->
  new Promise (resolve) ->
    setTimeout resolve.bind({}, 7), 100

@fnw = getWrapped(fn)
