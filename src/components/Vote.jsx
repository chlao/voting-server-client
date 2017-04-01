import React from 'react';

export default React.createClass({
  getPair: function(){
    return this.props.pair || [];
  },
  // isDisabled: function(){
  //   return !!this.props.hasVoted;
  // },
  hasVotedFor: function(){
    return this.props.hasVoted;
  },

  updateYourVote: function(){

  },

  // {this.hasVotedFor(entry) ?
  //   <div className="label">Voted</div> :
  // null}
  render: function(){
    return <div className="voting">
      {this.getPair().map(entry =>
        <button key={entry}
                onClick={() => this.props.vote(entry)}>
          <h1>{entry}</h1>
        </button>
      )}
      {this.props.hasVoted ?
        <div> Your Vote: {this.props.hasVoted} </div> : null }
    </div>;
  }
});
