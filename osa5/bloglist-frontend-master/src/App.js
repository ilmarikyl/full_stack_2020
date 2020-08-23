import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
	const [blogs, setBlogs] = useState([])
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [notificationStatus, setNotificationStatus] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const blogFormRef = useRef()


	useEffect(() => {
		const getBlogs = async () => {
			const returnedBlogs = await blogService.getAll()
			setBlogs(sortByLikes(returnedBlogs))
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


	const sortByLikes = (blogs) => (
		blogs.sort((a, b) =>  b.likes - a.likes)
	)


	const CreateNotification = (message, status, length) => {
		setNotificationMessage(message)
		setNotificationStatus(status)
		setTimeout(() => {
			setNotificationMessage(null)
		}, length)
	}


	const handleUsernameChange = (event) => {
		setUsername(event.target.value)
	}


	const handlePasswordChange = (event) => {
		setPassword(event.target.value)
	}


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
			CreateNotification('Logged in successfully!', true, 3000)
		} catch (exception) {
			CreateNotification('Invalid username or password', false, 3000)
		}
	}


	const handleLogout = async (event) => {
		event.preventDefault()
		setUser(null)
		CreateNotification('Logged out successfully!', true, 3000)
		window.localStorage.removeItem('loggedBlogAppUser')
	}


	const handleBlogAdd = async (blogToBeAdded) => {
		try {
			blogFormRef.current.toggleVisibility()
			const blogObject = {
				title: blogToBeAdded.title,
				author: blogToBeAdded.author,
				url: blogToBeAdded.url
			}
			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			CreateNotification(`Blog '${blogToBeAdded.title}' added successfully!`, true, 3000)
		} catch (error) {
			CreateNotification('Something went wrong and the blog was not added', false, 3000)
		}
	}


	const handleBlogDelete = async (blog) => {
		if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
			await blogService.remove(blog)
			CreateNotification(`Deleted blog '${blog.title}'`, true, 3000)
			const newBlogs = blogs.filter(element => element !== blog)
			setBlogs(newBlogs)
		}
	}


	const handleBlogLike = async blog => {
		blog.likes += 1
		await blogService.update(blog)
		const newBlogs = blogs.map(e => e.id === blog.id ? { ...e, likes: blog.likes } : e)
		setBlogs(sortByLikes(newBlogs))
	}


	return (
		<div>
			<h2>Blogs</h2>
			<Notification message={notificationMessage} successful={notificationStatus} />

			{user === null
				?
				<LoginForm
					handleSubmit={handleLogin}
					username={username}
					password={password}
					handleUsernameChange={handleUsernameChange}
					handlePasswordChange={handlePasswordChange}
				/>
				:
				<div>
					<p>
						Logged in as {user.name}
						<button type="submit" onClick={handleLogout}>logout</button>
					</p>
					<Togglable primaryButtonLabel='Add new blog' secondaryButtonLabel='Cancel' ref={blogFormRef} secondaryButtonUp={false}>
						<BlogForm onBlogSubmit={handleBlogAdd} />
					</Togglable>
					<br/>

					{blogs.map(blog =>
						<div key={blog.id}>
							<Blog blog={blog} onLike={handleBlogLike} onDelete={handleBlogDelete} currentUser={user}/>
						</div>
					)}
				</div>
			}
		</div>
	)
}

export default App


