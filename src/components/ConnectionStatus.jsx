import React from 'react';
import {connect} from 'react-redux';

export default class ConnectionStatus extends React.PureComponent{
  render(){
    return <div>
      <div className={'connection__status--' + (this.props.status === true ? 'connected' : 'disconnected')}></div>
      <span className='connection__event'>{this.props.ev}</span>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    status: state.getIn(['connectionStatus', 'status']),
    ev: state.getIn(['connectionStatus', 'event'])
  }
}

export const ConnectionStatusContainer = connect(
  mapStateToProps
)(ConnectionStatus);
