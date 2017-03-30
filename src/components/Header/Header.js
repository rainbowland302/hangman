import React from 'react';
import { IndexLink, Link } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';

import './Header.scss';
import WingButton from '../WingButton/WingButton';

const Header = (props) => (
  <div className="header-wrapper">
    <WingButton className="start-button" onClick={props.autoPlay}></WingButton>
  </div>
);

Header.propTypes = {
  autoPlay: React.PropTypes.func.isRequired
}

export default Header;
