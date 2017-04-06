import React from 'react';

import './Header.scss';
import WingButton from '../WingButton/WingButton';
import FieldEditor from '../FieldEditor/FieldEditor';

const Header = (props) => (
  <div className="header-wrapper">
    <WingButton onClick={props.autoPlay}></WingButton>
    <FieldEditor value={props.email} onChange= {props.editEmail}></FieldEditor>
  </div>
);

Header.propTypes = {
  autoPlay: React.PropTypes.func.isRequired,
  editEmail: React.PropTypes.func.isRequired,
  email: React.PropTypes.string.isRequired
};

export default Header;
