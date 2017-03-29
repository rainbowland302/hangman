import { startGame, nextWord, guessWord, getResult, clearAll } from './gameAction';
import { guessFetch } from '../utils/request';

// Thunk is not compatible with redux-actions
// redux-action always set the returned function as payload of action ojbect.
export const autoPlay = async function() {
  return async(dispatch, getState) => {
    dispatch(clearAll());
    await dispatch(startGame());
    const { sessionId, numberOfWordsToGuess, numberOfGuessAllowedForEachWord } = getState().global;
    await dispatch(nextWord(sessionId));
    let wordList, totalWordCount;
    do {
      wordList = getState().game.wordList;
      totalWordCount = getState().game.totalWordCount;
      const { word, include, exclude } = wordList[totalWordCount - 1];
      // ask for next word when word is correct or exceed wrong time allowed
      if (word.indexOf('*') < 0 || exclude.length >= numberOfGuessAllowedForEachWord) {
        await dispatch(nextWord(sessionId));
      } else {
        const letter = await guessFetch({ length: word.length, include, exclude });
        await dispatch(guessWord(sessionId, letter));
      }
    } while ((totalWordCount < numberOfWordsToGuess))
  };
};
