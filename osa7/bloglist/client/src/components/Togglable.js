import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button variant='info' onClick={toggleVisibility}>{props.primaryButtonLabel}</Button>
			</div>
			<div style={showWhenVisible}>
				{ props.secondaryButtonUp ? <button onClick={toggleVisibility}>{props.secondaryButtonLabel}</button> : null }
				{props.children}
				{ props.secondaryButtonUp ? null : <Button size='sm' variant='secondary' onClick={toggleVisibility}>{props.secondaryButtonLabel}</Button> }
			</div>
		</div>
	)
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
	primaryButtonLabel: PropTypes.string.isRequired,
	secondaryButtonLabel: PropTypes.string.isRequired,
	secondaryButtonUp: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
}

export default Togglable