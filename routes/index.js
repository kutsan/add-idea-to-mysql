const router = require('express').Router()
const db = require('../utils/db')
const debug = require('debug')('app:general')

router.get('/', function(req, res) {
	debug(`GET ${req.url}`)

	db('SELECT * FROM ideas').then(data => {
		res.render('index', { data: data.reverse() })

		debug(`GET ${req.url}: The data from database has sent to the client.`)
	})
})

module.exports = router
