import React from 'react'

const Notification = ({ message, successful }) => {
	if (message === null) {
		return null
	}
	const status = successful === true ? 'success' : 'error'

	return <div className={status}> {message} </div>
}

export default Notification