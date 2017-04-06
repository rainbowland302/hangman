import { createAction } from 'redux-actions';

import * as type from './actionTypes';
import { gameFetch } from '../utils/request';

export const startGame = createAction(type.START_GAME, async email => {
  const payload = {
    playerId: email,
    action: type.START_GAME
  };
  const result = await gameFetch(payload);
  return result;
});

export const nextWord = createAction(type.NEXT_WORD, async sessionId => {
  const payload = {
    sessionId: sessionId,
    action: type.NEXT_WORD
  };
  const result = await gameFetch(payload);
  return result.data;
});

export const guessWord = createAction(type.GUESS_WORD, async(sessionId, guess) => {
  const payload = {
    sessionId: sessionId,
    action: type.GUESS_WORD,
    guess: guess
  };
  const result = await gameFetch(payload);
  return {...result.data, guess };
});

export const clearAll = createAction(type.CLEAR_ALL);

export const getResult = createAction(type.GET_RESULT, async sessionId => {
  const payload = {
    sessionId: sessionId,
    action: type.GET_RESULT
  };
  const result = await gameFetch(payload);
  return result.data;
});
