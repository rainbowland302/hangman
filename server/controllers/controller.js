import Express from 'express'

import config from '../config'
import startGame from './startGameController'
import nextWord from './nextWordController'
import guessWord from './guessWordController'

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

export default apiRoutes