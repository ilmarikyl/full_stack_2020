
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const loggedInUserJSON = JSON.parse(
	window.localStorage.getItem('loggedBlogAppUser'),
)

const initialState = loggedInUserJSON ? loggedInUserJSON : null

export const login = (username, password) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
			blogService.setToken(user.token)
			dispatch(setNotification('Logged in successfully!', 'success', 3))

			await dispatch({
				type: 'LOGIN',
				data: user,
			})

		} catch (exception) {
			dispatch(setNotification('Wrong username or password!', 'failure', 3))
		}
	}
}


export const getLogin = (loggedUser) => {
	return async dispatch => {
		window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
		blogService.setToken(loggedUser.token)

		await dispatch({
			type: 'GET_LOGIN',
			data: loggedUser
		})
	}
}


export const logout = () => {
	return async dispatch => {
		window.localStorage.removeItem('loggedBlogAppUser')
		dispatch(setNotification('You logged out!', 'success', 3))

		await dispatch({
			type: 'LOGOUT',
		})
	}
}


const loginReducer = (state = initialState, action) => {

	switch (action.type) {

	case 'LOGIN': {
		return action.data
	}

	case 'GET_LOGIN':
		return  { ...state, user:action.data }

	case 'LOGOUT': {
		return null
	}

	default:
		return state
	}
}



export default loginReducer