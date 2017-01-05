import { createAction } from 'redux-actions';

//const url = 'http://www.domain-name.com/game/on';
const url = 'http://localhost:3003/api/';

const gameFetch = async function(payload, route) {
  const response = await fetch(url+route, {
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    //body: JSON.stringify(payload)
  });
  const res = await response.json();
  return res;
}

// ------------------------------------
// Constants
// ------------------------------------
export const START_GAME = 'START_GAME';
export const NEXT_WORD = 'NEXT_WORD';
export const GUESS_WORD = 'GUESS_WORD';
export const GET_RESULT = 'GET_RESULT';

// ------------------------------------
// Actions
// ------------------------------------
export const startGame = createAction(START_GAME, async playerID => {
  const payload = {
    playerId: playerID,
    action : "startGame"
  }
  const result = await gameFetch(payload, 'start-game');
  return result.data;
});

export const nextWord = createAction(NEXT_WORD, async sessionId => {
  const payload = {
    sessionId: sessionId,
    action: 'nextWord'
  }
  const result = await gameFetch(payload, 'next-word');
  return await result.data;
});

export const guessWord = createAction(GUESS_WORD, async ({guess, sessionId}) => {
  const payload = {
    sessionId: sessionId,
    action: "guessWord",
    guess: guess
  };
  const result = await gameFetch(payload, 'guess-word');
  return result.data;
});

export const getResult = createAction(GET_RESULT, async sessionId => {
  const payload = {
    sessionId: sessionId,
    action: "getResult",
  };
  const result = await gameFetch(payload, 'get-result');
  return result;
});

export const actions = {
  startGame,
  nextWord,
  guessWord,
  getResult
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [NEXT_WORD]: (state, action) => [...state, action.payload],
  [GUESS_WORD]: (state, action) => [...state.slice(0, state.length - 1), action.payload]
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [];
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  console.log(state);
  return handler ? handler(state, action) : state
}
