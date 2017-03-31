// Sending actions to the server
// Redux middleware gets invoked when an action is dispatched, before the action hits the reducer and the store itself
// Create a remote action middleware that causes an action to be dispatched to not only the original store, but also to a remote store using a Socket.io connection

// Takes a Redux store and returns another funtion that takes a next callback
// which retrns a function that takes a Redux action

// Currying: this nesting of functions
// If we had all the arguments in just one function, we'd have to supply all the arguments everytime the middleware is used
// With the curried sersion, we can call the outermost function once and fet a return value that remembers what store to use
export default socket => store => next => action => {
  // When we get the state update from the server and dispatch the SET_STATE action, it goes back to the server (infinite loop)
  // Not appropriate to send each and every action to the server; some actions should be handled locally in the client
  // Can extend the middleware to send onlt certain actions to the server
  if (action.meta && action.meta.remote){
    // socket.emit('action', action);
    const clientId = store.getState().get('clientId');
    var actionWithClientId = Object.assign({}, action, {clientId});
    socket.emit('action', actionWithClientId);
  }
  // Next: callback middleware should call when it has done its work
  return next(action);
}
