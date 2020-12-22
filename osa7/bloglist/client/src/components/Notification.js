import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(state => state.notification)
	const fontColor = notification.status === 'success' ? '#196327' : '#9A1110'
	const bgColor = notification.status === 'success' ? '#C7FFD1' : '#F5C2B7'

	const style = {
		color: fontColor,
		padding: 10,
		borderWidth: 0,
		backgroundColor: bgColor
	}

	if (notification.text === '') {
		return null
	}


	return (
		<div style={style}>
			{notification.text}
		</div>
	)
}


export default Notification