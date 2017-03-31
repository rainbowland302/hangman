import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Power from 'material-ui/svg-icons/action/power-settings-new';
import { Link, Events } from 'react-scroll';

import './WingButton.scss';

const WingButton = (props) => {
  Events.scrollEvent.register('end', () => {
      props.onClick();
  });
  return (
    <div className="start-wrapper">
      {getWings()}
      <Link to="gameContainer" smooth={true}>
        <FloatingActionButton className="start-button">
          <Power className="power-icon" />
        </FloatingActionButton>
      </Link>
    </div>
  );
}


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
  onClick: React.PropTypes.func.isRequired
}

export default WingButton;
