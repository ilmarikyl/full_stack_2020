import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const createAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''

		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(addAnecdote(newAnecdote))


		dispatch(setNotification(`'${content}' added!`))
		setTimeout(() => dispatch(clearNotification()), 5000)
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={createAnecdote}>
				<div>
					<input name='anecdote' />
				</div>
				<button	type='submit' >create</button>
			</form>
		</>
	)
}


export default AnecdoteForm