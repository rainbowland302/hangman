require('babel-register')
const project = require('../config/project.config')
const server = require('../server/server')
const debug = require('debug')('app:bin:dev-server')

//server.listen(project.server_port)
debug(`Server is now running at http://localhost:${project.server_port}.`)