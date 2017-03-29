import React from 'react';
import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action_creators';

// Pure component: fully driven by the props it's given
export const Voting = React.createClass({
  render: function(){
    return <div>
      {this.props.winner ?
        // ref takes a callback that will be executed immediately after component is mounted/unmounted
        // ref callback receives the underlying DOM element as its argument
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote {...this.props} />
      }
    </div>;
  }
});

// Map the staet from the Redux store into an object of props
function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.getIn(['myVote', 'entry']),
    winner: state.get('winner')
  };
}

// Connects a React component to a Redux store
// Connect component: wraps the pure version w/ some lofic that will keep it in sync w/ the changing state of the Redux store

// Action creators: vote callback and vote action creator both have same name and same function signature, so we pass in actionCreators
// vote prop will be given to Voting (creates an action using the vote action creator and dispatches that action to the Redux store)
export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);
