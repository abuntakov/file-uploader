const initOptions = {
	connect(client) {
		const cp = client.connectionParameters
		console.log('Connected to database:', cp.database) // eslint-disable-line
	},
}

const pgp = require('pg-promise')(initOptions)

const cn = 'postgres://postgres:secret@localhost:5432/touch'
const db = pgp(cn)

module.exports = db
