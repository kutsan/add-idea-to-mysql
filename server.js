require('dotenv').config()
const app = require('./app')
const http = require('http')
const debug = require('debug')('app:development')

const port = normalizePort(process.env.PORT || '8080')
app.set('port', port)

const server = http.createServer(app)

server.listen(port)
server.on('listening', onListening)
server.on('error', onError)

function onListening() {
	let addr = server.address()
	let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port

	debug(`Listening on ${bind}`)
}

function onError(error) {
	if (error.syscall !== 'listen') throw error

	let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`)
			process.exit(1)
			break

		case 'EADDRINUSE':
			console.error(`${bind} is already in use`)
			process.exit(1)
			break

		default:
			throw error
	}
}

function normalizePort(val) {
	let port = parseInt(val, 10)

	if (isNaN(port)) return val

	if (port >= 0) return port

	return false
}
