import React, { useState, } from 'react'

const BlogForm = ({ onBlogSubmitted }) => {

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		const blogToBeAdded = { title, author, url }
		onBlogSubmitted(blogToBeAdded)
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<>
			<h2>Create new</h2>
			<form onSubmit={handleSubmit}>
				<div>Title:
					<input
						id='title'
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}/>
				</div>
				<div>Author:
					<input
						id='author'
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}/>
				</div>
				<div>URL:
					<input
						id='url'
						type="text"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}/>
				</div>
				<button type="submit">Create</button>
			</form>
		</>
	)
}

export default BlogForm