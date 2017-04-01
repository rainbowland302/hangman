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
        const payload = { length: word.length, include, exclude };
        // Only add position info when the number of * is less than 1/3 of the word length
        if (word.length / getNumberOf(word, '*') >= 3) payload.position = word.lastIndexOf('*') + 1;
        const letter = await guessFetch(payload);
        await dispatch(guessWord(sessionId, letter));
      }
    } while ((totalWordCount < numberOfWordsToGuess))
  };
};

const getNumberOf = (str, char) => {
  return str.split('').filter(c => c === char).length;
}
