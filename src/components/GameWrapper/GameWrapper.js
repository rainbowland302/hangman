import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

import './GameWrapper.scss';
import WordChipContainer from '../../containers/WordChipContainer';

export const GameWrapper = (props) => {
  return (
    <div id="gameContainer" className="game-wrapper">
      <div className="row">
        {
          Array(props.totalWordCount)
            .fill(true)
            .map((m, index) => <WordChipContainer key={index} targetId={index} />)
        }
      </div>
    </div>
  );
};

GameWrapper.propTypes = {
  totalWordCount: React.PropTypes.number.isRequired
};

export default GameWrapper;
