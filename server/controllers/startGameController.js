import Express from 'express'
import jwt from 'jsonwebtoken'

import config from '../config'
import Player from '../models/Player'
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
export default (req, res) => {
    const body = req.body
    const playerId = body.playerId
    if (validateEmail(playerId)) {
        const sessionId = jwt.sign({ email: playerId }, config.secret, {
            expiresIn: 60 * 60 * 24 * 30 // expires in 30 days
        })
        const playerDocument = new Player({ email: playerId, sessionId: sessionId })
        playerDocument.save((err) => {
            if (err) throw err
            res.json({
                message: "THE GAME IS ON",
                sessionId: sessionId,
                data: {
                    numberOfWordsToGuess: 40,
                    numberOfGuessAllowedForEachWord: 10
                }
            })
        })
    }
}

const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
}
