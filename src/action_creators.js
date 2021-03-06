export function setClientId(clientId){
  return {
    type: 'SET_CLIENT_ID',
    clientId
  }
}

export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function vote(entry) {
  return {
    meta: {remote: true},
    type: 'VOTE',
    entry
  };
}

export function next() {
  return {
    meta: {remote: true},
    type: 'NEXT'
  };
}

export function resetVote(){
  return {
    meta: {remote: true},
    type: 'RESET_VOTE'
  }
}

export function setConnectionStatus(ev, status){
  return {
    type: 'CONNECTION_STATUS',
    ev, 
    status
  }
}
