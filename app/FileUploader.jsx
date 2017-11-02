import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class FileUploader extends React.Component {
	uploadFile = (event) => {
		const { onFileUploaded } = this.props
		const data = new FormData()
		data.append('filename', event.target.files[0])
		axios.post('/api/v1/file/upload', data).then(() => {
			onFileUploaded()
		})
	}

	render() {
		return (
			<div>
				<input type="file" onChange={this.uploadFile} />
			</div>
		)
	}
}

FileUploader.propTypes = {
	onFileUploaded: PropTypes.func.isRequired,
}

export default FileUploader
