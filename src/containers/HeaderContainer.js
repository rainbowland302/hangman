import { connect } from 'react-redux';

import Header from '../components/Header/Header';
import { autoPlay } from '../actions/autoPlayAction';

// mapDispatchToProps (dispatch, ownProps)
const mapDispatchToProps = {
  autoPlay
};

// mapStateToProps (state, ownProps )
const mapStateToProps = (state, ownProps) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
