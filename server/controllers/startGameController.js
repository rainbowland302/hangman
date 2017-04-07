import Express from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';;

import config from '../config';
import Player from '../models/Player';
/*
Request:
{
  "playerId": "test@example.com",
  "action" : "startGame"
}
Response:
{
  "message": "THE GAME IS ON",
  "sessionId": "04ccda515d152cbe630e156af9095104",
  "data": {
     "numberOfWordsToGuess": 80,
     "numberOfGuessAllowedForEachWord": 10
  }
}
*/
const numberOfWordsToGuess = 80;
const numberOfGuessAllowedForEachWord = 10;

export default (req, res) => {
  const body = req.body;
  const playerId = body.playerId;
  if (validateEmail(playerId)) {
    const sessionId = jwt.sign({ email: playerId }, config.secret, {
      expiresIn: 60 * 60 * 24 * 30 // expires in 30 days
    });
    fs.readFile('./server/resource/train.txt', 'utf8', (err, data) => {
      const wordList = buildWordList(data.split('\n'), numberOfWordsToGuess);
      console.log(wordList);
      const playerDocument = new Player({ email: playerId, sessionId: sessionId, gameStatus: wordList });
      playerDocument.save((err) => {
        if (err) throw err;
        res.json({
          message: "THE GAME IS ON",
          sessionId: sessionId,
          data: { numberOfWordsToGuess, numberOfGuessAllowedForEachWord }
        });
      });
    });
  }
}

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

const buildWordList = (wordList, size) => {
  const length = wordList.length;
  return Array(size)
    .fill(true)
    .map((item, index, arr) => {
      let word = wordList[Math.floor(Math.random() * length)]
      while (arr.indexOf(word) >= 0) {
        word = wordList[Math.floor(Math.random() * length)]
      }
      return {
        word: word,
        result: word.replace(/\w/g, '*')
      };
    });
}
