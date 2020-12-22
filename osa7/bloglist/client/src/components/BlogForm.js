import React, { useState, } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'


const BlogForm = ({ onBlogSubmit }) => {

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		const blogToBeAdded = { title, author, url }
		onBlogSubmit(blogToBeAdded)
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div className='blogform'>
			<h2>Create new</h2>
			<Form onSubmit={handleSubmit}>
				<Form.Label>Title:</Form.Label>
				<Form.Control
					id='title'
					type="text"
					value={title}
					name="Title"
					onChange={({ target }) => setTitle(target.value)}/>

				<Form.Label>Author:</Form.Label>
				<Form.Control
					id='author'
					type="text"
					value={author}
					name="Author"
					onChange={({ target }) => setAuthor(target.value)}/>
				<Form.Label>URL:</Form.Label>
				<Form.Control
					id='url'
					type="text"
					value={url}
					name="Url"
					onChange={({ target }) => setUrl(target.value)}/>
				<Button style={{ 'marginTop': 5, 'marginBottom': 5 }} variant='info' id='submit-button' type="submit">Create</Button>
			</Form>
		</div>
	)
}

BlogForm.propTypes = {
	onBlogSubmit: PropTypes.func.isRequired
}

export default BlogForm