/* eslint-disable react/prop-types */
import React from 'react'

const Blog = ({ blog }) => (
	<div>
		<b>{blog.title}</b> {blog.author}
	</div>
)

export default Blog
