
export const setNotification = (text, status, time) => {
	return async dispatch => {
		const timer = setTimeout(() => {
			dispatch(clearNotification())
		}, time * 1000)


		dispatch({
			type: 'SET_MESSAGE',
			data: { text, status, timer }
		})
	}
}

export const clearNotification = () => {
	return {
		type: 'CLEAR_MESSAGE'
	}
}


const notificationReducer = (state = { text: '', timer: null, status: 'success' }, action) => {

	switch(action.type) {

	case 'SET_MESSAGE': {
		if (state.timer !== null) {
			clearTimeout(state.timer)
		}
		return { text: action.data.text, status: action.data.status, timer: action.data.timer }
	}

	case 'CLEAR_MESSAGE': {
		return { text: '', status: 'success', timer: null }
	}

	default:
		return state
	}
}


export default notificationReducer