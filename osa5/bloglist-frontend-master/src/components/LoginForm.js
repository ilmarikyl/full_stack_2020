import React, { useState } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

const LoginForm = () => (
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

export default LoginForm