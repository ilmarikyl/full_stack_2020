/* eslint-disable no-trailing-spaces */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/newBlogForm'
import Notification from './components/Notification'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [notificationStatus, setNotificationStatus] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		const getBlogs = async () => {
			const returnedBlogs = await blogService.getAll()
			setBlogs( returnedBlogs )
		}
		getBlogs()
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])


	const CreateNotification = (message, status, length) => {
		setNotificationMessage(message)
		setNotificationStatus(status)
		setTimeout(() => {
			setNotificationMessage(null)
		}, length)
	}


	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
			username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
			password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)


	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedBlogAppUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
			CreateNotification('Login successful', true, 3000)
		} catch (exception) {
			CreateNotification('Invalid username or password', false, 3000)
		}
	}


	const addBlog = async (blogToBeAdded) => {
		try {
			const blogObject = {
				title: blogToBeAdded.title,
				author: blogToBeAdded.author,
				url: blogToBeAdded.url
			}

			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			CreateNotification(`Blog '${blogToBeAdded.title}' added succesfully!`, true, 3000)
		} catch (error) {
			CreateNotification('Something went wrong and the blog was not added', false, 3000)
		}
	}

	
	const handleLogout = async (event) => {
		event.preventDefault()
		setUser(null)
		CreateNotification('Logged out successfully!', true, 3000)
		window.localStorage.removeItem('loggedBlogAppUser')
	}


	return (
		<div>
			<h2>Blogs</h2>
			<Notification message={notificationMessage} successful={notificationStatus} />

			{user === null ?
				loginForm() :
				<div>
					<p>
						Logged in as {user.name}
						<button type="submit" onClick={handleLogout}>logout</button>
					</p>

					<BlogForm onBlogSubmitted={addBlog} />

					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} />
					)}
				</div>
			}
		</div>
	)
}

export default App