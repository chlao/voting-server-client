import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
// Take pure components and wire them up into a Redux store
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
// import {List, Map} from 'immutable';

// const pair = List.of('Trainspotting', '28 Days Later');
// const tally = Map({'Trainspotting': 5, '28 Days Later': 4});

// const store = createStore(reducer);
// store.dispatch({
//   type: 'SET_STATE',
//   state: {
//     vote: {
//       pair: ['Sunshine', '28 Days Later'],
//       tally: {Sunshine: 2}
//     }
//   }
// });

// io can be used to connet to a Socket.io server
const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
  store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

const routes = <div>
  <Route path="/results" component={ResultsContainer} />
  <Route exact path="/" component={VotingContainer} />
</div>;

// <Route path="/" component={() => <VotingContainer pair={pair} tally={tally}/>} />

// HashRouter: Instruct router to us #hash based history mechanism (v. HTML5 history API)
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>{routes}</HashRouter>
  </Provider>,
  document.getElementById('app')
);

// ReactDOM.render(
//   <Voting pair={pair}/>,
//   document.getElementById('app')
// );

// ReactDOM.render(
//   <Voting pair={pair} winner='Trainspotting'/>,
//   document.getElementById('app')
// );
