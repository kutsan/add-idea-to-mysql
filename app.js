const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const debug = require('debug')('app:general')
const db = require('./utils/db')

app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

app.use('/', require('./routes/Index'))

app.post('/post', (req, res) => {
	debug(`POST ${req.url}`)

	db(`INSERT INTO ideas (ID, Idea) VALUES (?, ?)`, [
		req.body.id.toString().slice(-3),
		req.body.idea
	])
		.then(() => {
			res.send({ id: req.body.id.toString().slice(-3), idea: req.body.idea })

			debug(`POST ${req.url}: The data inserted into database.`)
		})
		.catch(err => {
			throw err
		})
})

app.use((req, res, next) => {
	debug('404 error occurred')

	let err = new Error('404 / Not Found')
	err.status = 404
	next(err)
})

app.use((err, req, res) => {
	debug('App error occurred')

	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	res.status(err.status || 500)
	res.render('Error')
})

module.exports = app
