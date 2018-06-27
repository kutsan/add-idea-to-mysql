const mysql = require('mysql')
const debug = require('debug')('app:database')

const { DB_HOST, DB_USER, DB_PASS, DB_DATABASE } = process.env

const db = mysql.createConnection({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASS,
	database: DB_DATABASE
})

db.connect()

module.exports = (query, values = []) => {
	return new Promise((resolve, reject) => {
		debug(`${query} ${values} requested.`)

		db.query(query, [...values], (error, results) => {
			if (error) {
				reject(error)
				debug(`Can't produce promise.`)
			} else {
				resolve(results)
				debug(`Request fulfilled.`)
			}
		})
	})
}
