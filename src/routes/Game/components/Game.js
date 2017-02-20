import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Row, Col } from 'react-flexbox-grid'

import WordChip from '../../../components/WordChip'

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

export const Game = (props) => {
  return (
    <div>
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
      <div style={styles.wrapper}>
        {props.allIds.map((id) => <WordChip key={id} targetId={id} />)}
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
  allIds: React.PropTypes.array.isRequired,
}

export default Game
