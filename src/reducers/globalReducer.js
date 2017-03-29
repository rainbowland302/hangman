import { START_GAME } from '../actions/actionTypes';

export default function globalReducer(state = {}, action) {
  if( action.type === START_GAME )
    return {
      sessionId: action.payload.sessionId,
      numberOfWordsToGuess: action.payload.data.numberOfWordsToGuess,
      numberOfGuessAllowedForEachWord: action.payload.data.numberOfGuessAllowedForEachWord
    };
  return state;
}
