import Express from 'express'

import config from '../config'
import startGame from './startGameController'
import nextWord from './nextWordController'
import guessWord from './guessWordController'
import createTrain from './createTrainController'
import tellMe from './tellMeController'

const app = new Express()
const apiRoutes = Express.Router()
app.set('superSecret', config.secret); // secret variable

apiRoutes.post('/game', (req, res) => {
  switch (req.body.action) {
    case 'startGame':
      startGame(req, res)
      break
    case 'nextWord':
      nextWord(req, res)
      break
    case 'guessWord':
      guessWord(req, res)
      break
    default:
      break
  }
})

apiRoutes.get('/createTrain', (req, res) => {
  createTrain(req, res)
})

apiRoutes.post('/tellMe', (req, res) => {
  tellMe(req, res)
})

export default apiRoutes
