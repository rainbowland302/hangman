import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Row, Col } from 'react-flexbox-grid'

import './Game.scss'
import WordChip from '../../../components/WordChip/WordChip'

export const Game = (props) => {
  return (
    <div className="game-wrapper">
      <Row>
        <RaisedButton
          label="Start Game"
          onClick={props.startGame}
          />
        <RaisedButton
          label="Next Word"
          primary={true}
          onClick={props.nextWord}
          />
        <RaisedButton
          label="Guess Word"
          secondary={true}
          onClick={props.guessWord}
          />
        <RaisedButton
          label="Get Result"
          onClick={props.getResult}
          />
        <RaisedButton
          label="Auto Play"
          onClick={props.autoPlay}
          />
      </Row>
      <div className="row">
        {
          Array(props.totalWordCount)
            .fill(true)
            .map((m, index) => <WordChip key={index} targetId={index} />)
        }
      </div>
    </div>
  )
}

Game.propTypes = {
  startGame: React.PropTypes.func.isRequired,
  nextWord: React.PropTypes.func.isRequired,
  guessWord: React.PropTypes.func.isRequired,
  getResult: React.PropTypes.func.isRequired,
  autoPlay: React.PropTypes.func.isRequired,
  totalWordCount: React.PropTypes.number.isRequired,
}

export default Game
