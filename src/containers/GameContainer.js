import { connect } from 'react-redux';

import GameWrapper from '../components/GameWrapper/GameWrapper';

// mapDispatchToProps (dispatch, ownProps)
const mapDispatchToProps = {

};

// mapStateToProps (state, ownProps )
const mapStateToProps = (state) => {
  return {
    totalWordCount: state.game.totalWordCount || 0
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameWrapper);
