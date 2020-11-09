export const setNotification = (text) => {
	return {
		type: 'SET_MESSAGE',
		data: { text }
	}
}

export const clearNotification = () => {
	return {
		type: 'CLEAR_MESSAGE'
	}
}

const notificationReducer = (state = '', action) => {
	// console.log('state now: ', state)
	// console.log('action', action)

	switch(action.type) {

	case 'SET_MESSAGE': {
		return action.data.text
	}
	case 'CLEAR_MESSAGE': {
		return ''
	}
	default:
		return state
	}

}

export default notificationReducer