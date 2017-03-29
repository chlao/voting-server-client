import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Tests the rendering of the buttons
import VotingSpec from '../test/components/Voting_spec';
import ResultSpec from '../test/components/Results_spec'; 

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
