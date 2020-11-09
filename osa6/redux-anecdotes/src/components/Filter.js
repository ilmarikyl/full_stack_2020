import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
	const dispatch = useDispatch()

	const handleChange = (event) => {
		// event.preventDefault()
		const filter = event.target.value
		dispatch(setFilter(filter))

		// input-kentän arvo muuttujassa event.target.value
	}
	const style = {
		marginTop: 10,
		marginBottom: 10
	}

	return (
		<div style={style}>
      filter <input onChange={handleChange} />
		</div>
	)
}

export default Filter