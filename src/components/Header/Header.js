import React from 'react';
import { IndexLink, Link } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';

import './Header.scss';
import WingButton from '../WingButton/WingButton';

const Header = () => (
  <div className="header-wrapper">
    <WingButton className="start-button"></WingButton>
  </div>
);

export default Header;
