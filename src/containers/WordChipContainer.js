import { connect } from 'react-redux';

import WordChip from '../components/WordChip/WordChip';

// mapDispatchToProps (dispatch, ownProps)
const mapDispatchToProps = {

};

// mapStateToProps (state, ownProps )
const mapStateToProps = (state, ownProps) => {
  return {
    wordItem: state.game.wordList[ownProps.targetId],
    targetId: ownProps.targetId
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordChip);
