import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = () => {

	const users = useSelector(state => state.users)
	const match = useRouteMatch('/users/:id')
	const user = users.find(u => u.id === match.params.id)

	if (!user) {
		return null
	}

	if (user.blogs.length === 0) {
		return (
			<h2>{user.name} hasn't added any blogs...</h2>
		)
	}

	return (
		<div >
			<h2>Blogs added by {user.name}</h2>
			<br/>

			<ListGroup variant="flush">
				{user.blogs.map(blog =>
					<ListGroup.Item as="li" key={blog.id}>
						<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
					</ListGroup.Item>
				)}

			</ListGroup>
		</div>



	)}


export default User