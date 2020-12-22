import React, { useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createLike, deleteBlog, addComment } from '../reducers/blogReducer'
import { ListGroup, Button, Form, InputGroup } from 'react-bootstrap'

const Blog = () => {

	const [comment, setComment] = useState('')
	const dispatch = useDispatch()
	const currentUser = useSelector(state => state.login)
	const blogs = useSelector(state => state.blogs)
	const match = useRouteMatch('/blogs/:id')
	const blog = blogs.find(u => u.id === match.params.id)

	const handleBlogDelete = async (blog) => {
		if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
			dispatch(deleteBlog(blog))
			dispatch(setNotification(`"${blog.title}" deleted!`, 'success', 3))
		}
	}

	const handleBlogLike = async blog => {
		dispatch(createLike(blog))
		dispatch(setNotification(`You liked "${blog.title}"!`, 'success', 2))
	}

	const handleCommentSubmit = (event) => {
		event.preventDefault()
		dispatch(addComment(blog.id, comment))
		dispatch(setNotification('Your comment was posted!', 'success', 2))
		setComment('')
	}

	const blogStyle = {
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		marginBottom: 3,
		lineHeight: 1.15
	}

	if (!blog) {
		return null
	}


	return (
		<div >
			<hr/>
			<h2>{blog.title}<span style={{ 'fontSize': '15px' }}> by {blog.author}</span></h2>
			<div style={blogStyle}>
				<div>URL: <b>{blog.url}</b></div>
				<br/>
				<div  >Likes: <b>{blog.likes} </b>
					<Button style={{ 'margin': 5 }} variant='info' size="sm" onClick={() => handleBlogLike(blog)}>like</Button></div>
				<br/>
				<div>Added by: <b>{blog.user.name}</b></div>
			</div>
			{blog.user.name === currentUser.name ? <Link to={'/blogs'}><Button size="sm" variant="danger" onClick={() => handleBlogDelete(blog)}>Delete</Button></Link> : null }
			<hr/>
			<div className='comment-section' >
				<h3>Comments</h3>
				<InputGroup className="mb-3">
					<Form.Control
						aria-describedby="basic-addon1"
						id='comment'
						type='text'
						value={comment}
						name='Comment'
						onChange={({ target }) => setComment(target.value)}
						placeholder='Write your comment here'/>
					<InputGroup.Append>
						<Button onClick={handleCommentSubmit} variant="outline-secondary">Submit</Button>
					</InputGroup.Append>
				</InputGroup>
				<ListGroup variant="flush">
					{blog.comments.map((comment, index) =>
						<ListGroup.Item as="li" key={index}>
							{comment}
						</ListGroup.Item>
					)}
				</ListGroup>
			</div>
		</div>
	)}


export default Blog
