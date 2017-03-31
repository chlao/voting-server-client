import {Map} from 'immutable';

function setState(state, newState){
  return state.merge(newState);
}

function vote(state, entry){
  const currentRound = state.getIn(['vote', 'round']);
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)){
    return state.set('myVote', Map({
      round: currentRound,
      entry
    }));
  } else{
    return state;
  }
}

function resetVote(state){
  const prevRound = state.getIn(['myVote', 'round']);
  const currentRound = state.getIn(['vote', 'round']);
  if (currentRound !== prevRound){
    return state.remove('myVote');
  } else{
    return state;
  }
}

function setClientId(state, clientId){
  return state.set('clientId', clientId);
}

export default function(state = Map(), action){
  switch(action.type){
    case 'SET_STATE':
      return resetVote(setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry);
    case 'SET_CLIENT_ID':
      return setClientId(state, action.clientId);
    default:
      return state;
  }
}
