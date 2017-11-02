import React from 'react'
import axios from 'axios'

class FileUploader extends React.Component {
	uploadFile = (event) => {
		const data = new FormData()
		data.append('filename', event.target.files[0])
		axios.post('/api/v1/file/upload', data).then((response) => {
			console.log(response) // do something with the response
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

export default FileUploader
