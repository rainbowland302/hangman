/* Server Packages */
import Express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'

/* Client Packages */
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

/* Common Packages */
import config from './config'

import webpackConfig from '../config/webpack.config'
import apiRoutes from './controllers/controller'

// Initialize Express server
const app = new Express()
const port = process.env.PORT || 3000

// connect database
mongoose.connect(config.database) // connect to database

//Config App
app.set('env', 'production')
app.use('/static', Express.static(__dirname + '/public')) // set static file location
app.use(bodyParser.urlencoded({ extended: false })) // only can deal with key/value
app.use(bodyParser.json()) // use body parser so we can get info from POST and/or URL parameters
app.use(cookieParser())
app.use(morgan('dev')) // log requests to the console

// Use hot reload middleware
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// Set API prefix, Use apiRoutes of  Controller to resolve
app.use('/api', apiRoutes)

// Error console
app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})

export default app
