import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(state => {
		return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
	})

	const voteAnecdote = (id) => {
		const votedAnecdote = anecdotes.find(n => n.id === id)
		dispatch(createVote(id))
		dispatch(setNotification(`You voted '${votedAnecdote.content}'!`))
		setTimeout(() => dispatch(clearNotification()), 5000)
	}

	return (
		<>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes} votes
						<button
							onClick={() => voteAnecdote(anecdote.id)}>vote
						</button>
					</div>
				</div>
			)}
		</>
	)
}


export default AnecdoteList