import React from 'react';
import classNames from 'classnames';

import './WordChip.scss';

function checkWord(str) {
    const reg = /\*/;
    return !reg.test(str);
}

function getWord(wordItem, targetId) {
    const {word, include, exclude} = wordItem;
    const isCorrect = checkWord(word);
    const chipClass = classNames({
      'chip-wrapper': true,
      'correct': isCorrect,
      'incorrect': !isCorrect
    });
    return (
      <div className="col-xs-4 col-md-3 col-lg-2" key={targetId}>
        <div className={chipClass}>
          <div>{word}</div>
          <div className='include'>{include}</div>
          <div className='exclude'>{exclude}</div>
        </div>
      </div>
    );
}

const WordChip = (props) => {
    return getWord(props.wordItem, props.targetId);
};

WordChip.propTypes = {
    wordItem: React.PropTypes.object,
    targetId: React.PropTypes.number
};

export default WordChip;
