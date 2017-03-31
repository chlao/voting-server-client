import React from 'react';
import {next, resetVote} from '../action_creators';

export default class Management extends React.PureComponent {
  render(){
    return <div className="management">
        <button ref="next"
                className="next"
                onClick={next}>
          Next
        </button>
        <button className="reset_vote"
                onClick={resetVote}>
          Reset Votes
        </button>
      </div>;
  }
}
