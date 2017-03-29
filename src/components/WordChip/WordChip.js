import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import './WordChip.scss';

function checkWord(str) {
    const reg = /\*/;
    return !reg.test(str);
}

function getWord(word, index) {
    const isCorrect = checkWord(word);
    const chipClass = classNames({
      'chip-wrapper': true,
      'correct': isCorrect,
      'incorrect': !isCorrect
    });
    return (
      <div className="col-xs-4 col-md-3 col-lg-2" key={index}>
        <div className={chipClass}>
          {word}
        </div>
      </div>
    );
}

const WordChip = (props) => {
    return getWord(props.word, props.index);
};

WordChip.propTypes = {
    word: React.PropTypes.string,
    index: React.PropTypes.number
};

const TargetView = connect(
    (state, ownProps) => {
        //can not add console.log(state) here
        return { word: state.game.wordList[ownProps.targetId].word, index: ownProps.targetId };
    }
)(WordChip);

export default TargetView;
