import { connect } from 'react-redux';

import Header from '../components/Header/Header';
import { autoPlay } from '../actions/autoPlayAction';
import { editEmail } from '../actions/globalAction';

// mapDispatchToProps (dispatch, ownProps)
const mapDispatchToProps = {
  autoPlay,
  editEmail
};

// mapStateToProps (state, ownProps )
const mapStateToProps = (state) => {
  return {
    email: state.global.email
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
