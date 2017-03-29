import { NEXT_WORD, GUESS_WORD, CLEAR_ALL } from '../actions/actionTypes';
// ------------------------------------
// Action Handlers
/*
{
  wordList: {
    0: {
      word: 'pl*y',
      include: ['p', 'l', 'y'],
      exclude: ['b', 'c']
    }
  }
  totalWordCount : Number
}
*/
// ------------------------------------

const initialState = { totalWordCount: 0, wordList: {} }

export default function gameReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}


const ACTION_HANDLERS = {
  [NEXT_WORD]: (state, action) => {
    const { word, totalWordCount } = action.payload;
    // populate original wordList
    const wordList = {...state.wordList };
    // create a new word item
    wordList[totalWordCount - 1] = {
      word,
      include: [],
      exclude: []
    };
    return { wordList, totalWordCount };
  },
  [GUESS_WORD]: (state, action) => {
    const { word, totalWordCount, guess } = action.payload;
    // populate original wordList
    const wordList = {...state.wordList };
    // create a new word item based on the last one
    const wordItem = {...wordList[totalWordCount - 1] };
    if (word === wordItem.word) {
      wordItem.exclude = [...wordItem.exclude, guess];
    } else {
      wordItem.include = [...wordItem.include, guess];
      wordItem.word = word;
    }
    // override the original last word item
    wordList[totalWordCount - 1] = wordItem;
    return { wordList, totalWordCount };
  },
  [CLEAR_ALL]: (state, action) => {
    return { totalWordCount: 0, wordList: {} };
  }
};
