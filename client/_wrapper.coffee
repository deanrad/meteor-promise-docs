@PromiseHelper = (fn) ->
  do(returnValues = {}, preResolveDeps = {}) ->
    (args..., spacebars) ->
      console.log "helper run for ", args

      result = null
      argHash = EJSON.stringify args, canonical: true
      helperComputation = Tracker.currentComputation

      # When we've had to call into this function due to the promise resolving
      # we kept from deleting our dependencies. Restore them and return the resolved value
      if helperComputation.isPromiseResolve
        helperComputation._onInvalidateCallbacks = helperComputation.depsNotDeleted
        delete helperComputation.depsNotDeleted
        delete helperComputation.isPromiseResolve
        return returnValues[argHash]

      reactiveValue = Tracker.autorun ->
        console.log "evaluating helper " + argHash
        delete returnValues[argHash]
        result = fn.apply({}, args)
        returnValues[argHash] = result

      reactiveValue.onInvalidate ->
        if not helperComputation.isPromiseResolve
          delete returnValues[argHash]
          helperComputation.invalidate()

      if returnValues[argHash] instanceof Promise
        promise = result
        promise.then (v) ->
          console.log "Promise resolved", argHash, v
          returnValues[argHash] = v
          helperComputation.isPromiseResolve = true #notify not to do

          # this time around dont delete the deps when invalidated
          helperComputation.depsNotDeleted = helperComputation._onInvalidateCallbacks
          helperComputation._onInvalidateCallbacks = []

          helperComputation.invalidate()


      return returnValues[argHash]


# @getWrapped = (fn) ->
#   do (promise=null, isResolved=null, value=null) ->
#     (args..., spacebars) ->
#       console.log "obtaining promise for:", args
#
#       helperComputation = Tracker.currentComputation
#       if promise then return value
#       result = fn.apply({}, args)
#       if result instanceof Promise
#         promise = result
#         return promise.then (v) ->
#           console.log "promise resolved"
#           helperComputation.invalidate()
#           isResolved = true
#           value = v
#       else
#         result
#
