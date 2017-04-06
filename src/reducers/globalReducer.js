import { START_GAME, EDIT_EMAIL } from '../actions/actionTypes';

export default function globalReducer(state = { email: 'test@example.com' }, action) {
  switch (action.type) {
    case START_GAME:
      return {
        sessionId: action.payload.sessionId,
        numberOfWordsToGuess: action.payload.data.numberOfWordsToGuess,
        numberOfGuessAllowedForEachWord: action.payload.data.numberOfGuessAllowedForEachWord,
        email: state.email
      };
    case EDIT_EMAIL:
      return {
        sessionId: state.sessionId,
        numberOfWordsToGuess: state.numberOfWordsToGuess,
        numberOfGuessAllowedForEachWord: state.numberOfGuessAllowedForEachWord,
        email: action.payload.email
      };
    default:
      return state;
  }
}
