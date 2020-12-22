import React, {  useRef } from 'react'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogsView = () => {

	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const blogFormRef = useRef()

	const handleBlogAdd = async (blog) => {
		blogFormRef.current.toggleVisibility()
		dispatch(addBlog(blog))
		dispatch(setNotification(`"${blog.title}" added!`, 'success', 5))
	}


	return (
		<div>
			<h2>Blogs</h2>
			<br/>
			<Togglable primaryButtonLabel='Add new blog' secondaryButtonLabel='Cancel' ref={blogFormRef} secondaryButtonUp={false}>
				<BlogForm onBlogSubmit={handleBlogAdd} />
			</Togglable>
			<br/>
			<Table hover>
				<tbody>
					{blogs.map(blog =>
						<tr key={blog.id}>
							<td >
								<b><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></b> by <b>{blog.author}</b>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	)}



export default BlogsView
