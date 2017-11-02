import React from 'react'
import FileUploader from './FileUploader'

class App extends React.Component {
	state = {
		isFileUploaded: false,
	}

	onFileUploaded = () => {
		this.setState({ isFileUploaded: true })
	}

	render() {
		const { isFileUploaded } = this.state

		return (
			<div>
				<h1>File uploader</h1>
				<FileUploader onFileUploaded={this.onFileUploaded} />
				{ isFileUploaded && <span>File uploaded</span> }
			</div>
		)
	}
}

export default App
