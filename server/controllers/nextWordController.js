import Express from 'express'

import Player from '../models/Player'
/*
Request:
{
  "sessionId": "3f0421bb5cb56631c170a35da90161d2",
  "action" : "nextWord"
}
Response:
{
  "sessionId": "3f0421bb5cb56631c170a35da90161d2",
  "data": {
    "word": "*****",
    "totalWordCount": 1,
    "wrongGuessCountOfCurrentWord": 0
  }
}
*/
export default (req, res) => {
    const body = req.body
    const sessionId = body.sessionId
    if (sessionId) {
        Player.findOneAndUpdate({ sessionId: sessionId }, { $inc: { totalWordCount: 1 } }, (err, player) => {
            player.save((err) => {
                if (err) throw err
                const curWordIndex = player.totalWordCount
                res.json({
                    sessionId: sessionId,
                    data: {
                        word: player.gameStatus[curWordIndex].result,
                        totalWordCount: curWordIndex + 1,
                        wrongGuessCountOfCurrentWord: player.gameStatus[curWordIndex].wrongTimes
                    }
                })
            })
        })
    }
}