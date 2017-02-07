import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Row, Col } from 'react-flexbox-grid'

import WordChip from '../../../components/WordChip'

export const Game = (props) => (
  <div>
    <h2>Player Id: {props.playerId}</h2>
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
    </Row>
    <WordChip words={props.words} />
  </div>
)

Game.propTypes = {
  playerId: React.PropTypes.number.isRequired,
  startGame: React.PropTypes.func.isRequired,
  nextWord: React.PropTypes.func.isRequired,
  guessWord: React.PropTypes.func.isRequired,
  getResult: React.PropTypes.func.isRequired,
  words: React.PropTypes.array.isRequired
}

export default Game
