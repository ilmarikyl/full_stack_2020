
export const setNotification = (text, time) => {
	return async dispatch => {
		const timer = setTimeout(() => {
			dispatch(clearNotification())
		}, time * 1000)

		dispatch({
			type: 'SET_MESSAGE',
			data: { text, timer }
		})
	}
}


export const clearNotification = () => {
	return {
		type: 'CLEAR_MESSAGE'
	}
}


const notificationReducer = (state = { text: '', timer: null }, action) => {

	switch(action.type) {

	case 'SET_MESSAGE': {
		if (state.timer !== null) {
			clearTimeout(state.timer)
		}
		return { text: action.data.text, timer: action.data.timer }
	}

	case 'CLEAR_MESSAGE': {
		return { text: '', timer: null }
	}

	default:
		return state
	}
}


export default notificationReducer