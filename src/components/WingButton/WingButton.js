import React from 'react';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Power from 'material-ui/svg-icons/action/power-settings-new';

import { autoPlay } from '../../actions/autoPlayAction';
import './WingButton.scss';

const WingButton = (props) => (
  <div className="start-wrapper" onClick={props.autoPlay}>
    {getWings()}
    <FloatingActionButton className="start-button" href="#game">
      <Power className="power-icon" />
    </FloatingActionButton>
  </div>
);

const getWings = () => {
  let wings = [];
  for (let i = 0; i < 2 ; i++) {
    wings.push(<div key={i} className="wing">{getFeathers()}</div>);
  }
  return wings;
}

const getFeathers = () => {
  let feathers = [];
  for (let i = 0; i< 10; i++) {
    feathers.push(<div key={i} className="feather"></div>);
  }
  return feathers;
}

WingButton.propTypes = {
    autoPlay: React.PropTypes.func.isRequired
};

const TargetView = connect(()=>({}), {autoPlay})(WingButton); // merge props with its own props

export default TargetView;
