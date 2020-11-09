export const setFilter = filter => {
	return {
		type: 'SET_FILTER',
		data: { filter }
	}
}

function reducer(state = 'a', action) {
	switch (action.type) {
	case 'SET_FILTER':
		return action.data.filter
	default:
		return state
	}
}

export default reducer