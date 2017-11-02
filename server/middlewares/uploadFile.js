const MAX_FILE_SIZE = 1024 * 1024 * 10
const multer  = require('multer')
const uuid = require('uuid/v4')
const mime = require('mime')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '/tmp/uploads')
	},

	filename: (req, file, cb) => {
		const filename = `${uuid()}.${mime.getExtension(file.mimetype)}`
		cb(null, filename)
	},
})

const upload = multer({
	storage,

	limits: {
		fileSize: MAX_FILE_SIZE,
	},
}).single('filename')

module.exports = (req, res, next) => {
	upload(req, res, (error) => {
		if (error) {
			return res.status(500).json({ code: 500, message: error.message })
		}

		return next()
	})
}
