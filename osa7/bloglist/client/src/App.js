import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersView from './components/UsersView'
import BlogsView from './components/BlogsView'
import User from './components/User'
import { useSelector, useDispatch } from 'react-redux'
import { getBlogs } from './reducers/blogReducer'
import { getUsers } from './reducers/userReducer'
import { login, getLogin, logout } from './reducers/loginReducer'
import { Button, Navbar, Nav } from 'react-bootstrap'

import {
	BrowserRouter as Router,
	Switch, Route, Link
} from 'react-router-dom'


const App = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const user = useSelector(state => state.login)

	useEffect(() => {
		dispatch(getBlogs())
		dispatch(getUsers())
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(getLogin(user))
		}

	},[dispatch])


	const handleUsernameChange = (event) => {
		setUsername(event.target.value)
	}


	const handlePasswordChange = (event) => {
		setPassword(event.target.value)
	}


	const handleLogin = async (event) => {
		event.preventDefault()
		dispatch(login(username, password))
		setUsername('')
		setPassword('')
	}


	const handleLogout = async (event) => {
		event.preventDefault()
		dispatch(logout())
	}


	const padding = {
		padding: 5
	}

	if (user === null) {
		return (
			<div className='container'>
				<h1>Blog app</h1>
				<br/>
				<Notification />
				<LoginForm
					handleSubmit={handleLogin}
					handleUsernameChange={handleUsernameChange}
					handlePasswordChange={handlePasswordChange}
				/>
			</div>
		)
	}


	return (
		<div className='container'>
			<h1>Blog app</h1>
			<Router>
				<Navbar collapseOnSelect expand="sm" bg="light" variant="light">
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="#" as="span">
								<Link style={padding} to="/blogs">Blogs</Link>
							</Nav.Link>
							<Nav.Link href="#" as="span">
								<Link style={padding} to="/users">Users</Link>
							</Nav.Link>
							<span style={padding} >Logged in as {user.name}</span>
							<span style={padding} ><Button variant='secondary' size='sm' type="submit" onClick={handleLogout}>Logout</Button></span>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<Notification />
				<Switch>
					<Route path="/users/:id">
						<User />
					</Route>
					<Route path="/blogs/:id">
						<Blog />
					</Route>
					<Route path="/users">
						<UsersView/>
					</Route>
					<Route path="/blogs">
						<BlogsView/>
					</Route>
					<Route path="/">
						<BlogsView />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App


