import { createAction } from 'redux-actions'

import makeGuess from '../../../utilities/makeGuess'

const url = 'http://localhost:3000/api/game'
const email = 'test@example.com'

const ctrlStatus = {
    sessionId: '',
    curWord: '',
    curTotalTimes: 0,
    curWrongTimes: 0,
    numberOfWordsToGuess: 0,
    numberOfGuessAllowedForEachWord: 0
}

const gameFetch = async function(payload) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const res = await response.json()
    updateControlStatus(ctrlStatus, payload.action, res)
    return res.data
}

const updateControlStatus = (status, action, update) => {
    switch (action) {
        case START_GAME:
            status.sessionId = update.sessionId
            status.numberOfWordsToGuess = update.data.numberOfWordsToGuess
            status.numberOfGuessAllowedForEachWord = update.data.numberOfGuessAllowedForEachWord
            status.curWord = ''
            status.curWrongTimes = 0
            break
        case GUESS_WORD:
            status.curWord = update.data.word
            status.curWrongTimes = update.data.wrongGuessCountOfCurrentWord
            break
        case NEXT_WORD:
            status.curWord = update.data.word
            status.curWrongTimes = 0
            break
        default:
            break
    }
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
        sessionId: ctrlStatus.sessionId,
        action: NEXT_WORD
    }
    const result = await gameFetch(payload)
    return result
})

export const guessWord = createAction(GUESS_WORD, async(guess) => {
    const payload = {
        sessionId: ctrlStatus.sessionId,
        action: GUESS_WORD,
        guess: guess
    }
    const result = await gameFetch(payload)
    return result
})

export const clearAll = createAction(CLEAR_ALL)

export const getResult = createAction(GET_RESULT, async sessionId => {
    const payload = {
        sessionId: ctrlStatus.sessionId,
        action: GET_RESULT
    }
    const result = await gameFetch(payload)
    return result
})

// Thunk is not compatible with redux-actions
// redux-action always set the returned function as payload of action ojbect.
export const autoPlay = async function() {
    return async dispatch => {
        dispatch(clearAll())
        await dispatch(startGame())
        while (ctrlStatus.numberOfWordsToGuess + 1) {
            if (ctrlStatus.curWrongTimes >= ctrlStatus.numberOfGuessAllowedForEachWord || !/\*/.test(ctrlStatus.curWord)) {
                await dispatch(nextWord())
                ctrlStatus.numberOfWordsToGuess--
            } else {
                const guess = makeGuess(ctrlStatus.curWord, ctrlStatus.curWrongTimes)
                await dispatch(guessWord(guess))
            }
        }
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
// ------------------------------------
const ACTION_HANDLERS = {
    [NEXT_WORD]: (state, action) => {
        const payload = action.payload
        const newObj = {...state }
        newObj[payload.totalWordCount] = payload.word
        newObj.allIds = [...newObj.allIds, payload.totalWordCount]
        return newObj
    },
    [GUESS_WORD]: (state, action) => {
        const payload = action.payload
        const newObj = {...state }
        newObj[payload.totalWordCount] = payload.word
        return newObj
    },
    [CLEAR_ALL]: (state, action) => {
        return { allIds: [] }
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { allIds: [] }
export default function gameReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
