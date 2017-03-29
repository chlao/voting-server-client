import React from 'react';
import {List} from 'immutable';

const pair = List.of('Trainspotting', '28 Days Later');

// Render its child components, expected to be given in as the children props
// react-reouter plugs in the component(s) defined for whatver the current route happens to be
export default React.createClass({
  render: function(){
    console.log('rendering App')
    return React.cloneElement(this.props.children, {pair: pair});
  }
});
