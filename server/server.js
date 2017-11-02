const express = require('express')
const uploadFileMiddleware = require('./middlewares/uploadFile')
const db = require('./libs/db')

const app = express()
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs')

app.locals.env = process.env.NODE_ENV || 'development'

app.use('/assets', express.static('build'))

app.post('/api/v1/file/upload', uploadFileMiddleware, (req, res) => {
	const filepath = req.file.path
	db.one('INSERT INTO files (binary_file) VALUES(lo_import($1)) RETURNING id', filepath)
		.then((data) => {
			res.send(data)
		})
		.catch((error) => {
			res.status(500).json({ code: 500, message: error.message })
		})
})

app.get('/', (req, res) => {
	res.render('index', {})
})

app.listen(3000, () => {
	console.log('App listening on port 3000!') // eslint-disable-line
})
