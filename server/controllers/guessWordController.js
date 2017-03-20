import Express from 'express'

import Player from '../models/Player'
/*
Request:
{
  "sessionId": "3f0421bb5cb56631c170a35da90161d2",
  "action" : "guessWord",
  "guess" : "P"
}
Response:
{
  "sessionId": "3f0421bb5cb56631c170a35da90161d2",
  "data": {
    "word": "**PP*",
    "totalWordCount": 1,
    "wrongGuessCountOfCurrentWord": 0
  }
}
*/
export default (req, res) => {
  const body = req.body
  const sessionId = body.sessionId
  const guess = body.guess
  if (sessionId) {
    Player.findOne({ sessionId: sessionId }, (err, player) => {
      const curWordIndex = player.totalWordCount - 1
      const curStatus = player.gameStatus[curWordIndex]
      const newResult = handleWord(curStatus.result, curStatus.word, guess)
      newResult === curStatus.result ? curStatus.wrongTimes += 1 : curStatus.result = newResult
      player.save((err) => {
        if (err) throw err
        res.json({
          sessionId: sessionId,
          data: {
            word: curStatus.result,
            totalWordCount: player.totalWordCount,
            wrongGuessCountOfCurrentWord: curStatus.wrongTimes
          }
        })
      })
    })
  }
}

// eg: handleWord('*e**', 'test', t)
const handleWord = (result, word, guess) => {
  const reg = new RegExp(guess, 'ig')
  while (reg.exec(word)) {
    result = result.substr(0, reg.lastIndex - 1) + guess + result.substr(reg.lastIndex);
  }
  return result
}
