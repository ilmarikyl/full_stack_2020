import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange }) => {

	return (
		<div>
			<h2>Login</h2>
			<br/>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Username:</Form.Label>
					<Form.Control
						type="text"
						name="username"
						placeholder="Enter username"
						onChange={handleUsernameChange}
					/>
					<Form.Label>Password:</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						onChange={handlePasswordChange}
					/>
					<br/>
					<Button variant="success" type="submit">
						Login
					</Button>
				</Form.Group>
			</Form>
		</div>
	)
}


LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired
}

export default LoginForm

