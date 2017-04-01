import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
// Take pure components and wire them up into a Redux store
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setClientId, setState, setConnectionStatus} from './action_creators';
import getClientId from './client_id';
import remoteActionMiddleware from './remote_action_middleware';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
import {ConnectionStatusContainer} from './components/ConnectionStatus';

// io can be used to connet to a Socket.io server
const socket = io(`${location.protocol}//${location.hostname}:8090`);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

// Set client id upon entering page
store.dispatch(setClientId(getClientId()));

[
   'connect',
   'connect_error',
   'connect_timeout',
   'reconnect',
   'reconnecting',
   'reconnect_error',
   'reconnect_failed',
   'disconnect'
 ].forEach(event =>
   socket.on(event, () => store.dispatch(setConnectionStatus(event, socket.connected)))
 );

socket.on('state', state =>
  store.dispatch(setState(state))
);

const routes = <div>
  <Route path="/" component={ConnectionStatusContainer} />
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
