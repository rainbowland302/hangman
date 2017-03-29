import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

import './GameWrapper.scss';
import WordChip from '../WordChip/WordChip';

export const GameWrapper = (props) => {
  return (
    <div className="game-wrapper">
      <a className="section-anchor" name="GameWrapper"></a>
      <div className="row">
        {
          Array(props.totalWordCount)
            .fill(true)
            .map((m, index) => <WordChip key={index} targetId={index} />)
        }
      </div>
    </div>
  );
};

GameWrapper.propTypes = {
  totalWordCount: React.PropTypes.number.isRequired
};

export default GameWrapper;
