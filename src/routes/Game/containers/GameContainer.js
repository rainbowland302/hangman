import { connect } from 'react-redux'
import { startGame, nextWord, guessWord, getResult, autoPlay } from '../modules/game'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the Game:   */

import Game from '../components/Game'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment the component doesn't care   */

// mapDispatchToProps (dispatch, ownProps)
const mapDispatchToProps = {
  startGame,
  nextWord,
  guessWord,
  getResult,
  autoPlay
}

// store.subscribe to update component state
// TODO Isolate which parts of the overall state this component needs as its props.Skip re-rendering
// Use Selectors for Calculated State and Decoupling
// mapStateToProps (state, ownProps )
const mapStateToProps = (state) => {
  return {
    playerId: state.playerId || '',
    words: state.game
  }
}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const game = (state) => state.game
    const tripleCount = createSelector(game, (count) => count * 3)
    const mapStateToProps = (state) => ({
      game: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Game) // merge props with its own props
