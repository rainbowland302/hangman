import { createAction } from 'redux-actions'

import makeGuess from '../../../utilities/makeGuess'

const gameUrl = 'http://localhost:3000/api/game'
const guessUrl = 'http://localhost:3000/api/tellme'
const email = 'test@example.com'
const numberOfGuessAllowedForEachWord = 10
const numberOfWordsToGuess = 40
let sessionId

const gameFetch = async function(payload) {
  const response = await fetch(gameUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  const res = await response.json()
  sessionId = sessionId || res.sessionId
  return res.data
}

const guessFetch = async function(payload) {
    const response = await fetch(guessUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const res = await response.json()
    return res.letter
  }
  // ------------------------------------
  // Constants
  // ------------------------------------
export const START_GAME = 'startGame'
export const NEXT_WORD = 'nextWord'
export const GUESS_WORD = 'guessWord'
export const GET_RESULT = 'getResult'
export const CLEAR_ALL = 'clearAll'
export const AUTO_PLAY = 'autoPlay'

// ------------------------------------
// Actions
// ------------------------------------
export const startGame = createAction(START_GAME, async() => {
  const payload = {
    playerId: email,
    action: START_GAME
  }
  const result = await gameFetch(payload)
})

export const nextWord = createAction(NEXT_WORD, async() => {
  const payload = {
    sessionId: sessionId,
    action: NEXT_WORD
  }
  const result = await gameFetch(payload)
  return result
})

export const guessWord = createAction(GUESS_WORD, async guess => {
  const payload = {
    sessionId: sessionId,
    action: GUESS_WORD,
    guess: guess
  }
  const result = await gameFetch(payload)
  return {...result, guess }
})

export const clearAll = createAction(CLEAR_ALL)

export const getResult = createAction(GET_RESULT, async() => {
  const payload = {
    sessionId: sessionId,
    action: GET_RESULT
  }
  const result = await gameFetch(payload)
  return result
})

// Thunk is not compatible with redux-actions
// redux-action always set the returned function as payload of action ojbect.
export const autoPlay = async function() {
  return async(dispatch, getState) => {
    dispatch(clearAll())
    await dispatch(startGame())
    await dispatch(nextWord())
    let wordList, totalWordCount
    do {
      wordList = getState().game.wordList
      totalWordCount = getState().game.totalWordCount
      console.log(wordList + ' ' + totalWordCount)
      const { word, include, exclude } = wordList[totalWordCount - 1]
        // ask for next word when word is correct or exceed wrong time allowed
      if (word.indexOf('*') < 0 || exclude.length >= numberOfGuessAllowedForEachWord) {
        await dispatch(nextWord())
      } else {
        const letter = await guessFetch({ length: word.length, include, exclude })
        await dispatch(guessWord(letter))
      }
    } while ((totalWordCount < numberOfWordsToGuess))
  }
}


export const actions = {
  startGame,
  nextWord,
  guessWord,
  getResult,
  autoPlay
}

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
const ACTION_HANDLERS = {
  [NEXT_WORD]: (state, action) => {
    const { word, totalWordCount } = action.payload
      // populate original wordList
    const wordList = {...state.wordList }
      // create a new word item
    wordList[totalWordCount - 1] = {
      word,
      include: [],
      exclude: []
    }
    return { wordList, totalWordCount }
  },
  [GUESS_WORD]: (state, action) => {
    const { word, totalWordCount, guess } = action.payload
      // populate original wordList
    const wordList = {...state.wordList }
      // create a new word item based on the last one
    const wordItem = {...wordList[totalWordCount - 1] }
    if (word === wordItem.word) {
      wordItem.exclude = [...wordItem.exclude, guess]
    } else {
      wordItem.include = [...wordItem.include, guess]
      wordItem.word = word
    }
    // override the original last word item
    wordList[totalWordCount - 1] = wordItem
    return { wordList, totalWordCount }
  },
  [CLEAR_ALL]: (state, action) => {
    return { totalWordCount: 0, wordList: {} }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { totalWordCount: 0, wordList: {} }
export default function gameReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
