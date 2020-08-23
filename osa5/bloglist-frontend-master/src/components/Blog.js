import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLike, onDelete, currentUser }) => {
	const blogListStyle = {
		paddingTop: 10,
		paddingBottom: 4,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const [showMore, setShowMore] = useState(false)

	const allData = (
		<div>
			{blog.url}
			<br/>
			likes: {blog.likes} <button className='like-button' onClick={() => onLike(blog)}>like</button>
			<br/>
			{blog.user.name}
		</div>
	)


	return (
		<div className='blogEntry' style={blogListStyle}>
			<b>{blog.title} </b>{blog.author}
			{showMore ? <button style={{ marginLeft: '.5rem' }} onClick={() => setShowMore(!showMore)}>hide</button> : null}
			{showMore ? allData : null }
			{showMore ? null : <button className='view-button' style={{ marginLeft: '.5rem' }} onClick={() => setShowMore(!showMore)}>view</button>}
			{showMore && blog.user.name === currentUser.name ? <button onClick={() => onDelete(blog)}>Delete</button> : null }
		</div>
	)}


Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	onLike: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	currentUser: PropTypes.object.isRequired,
}

export default Blog
