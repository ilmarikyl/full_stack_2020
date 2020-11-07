import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(state => state)

	const voteAnecdote = (id) => {
		dispatch(createVote(id))
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
						<button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
		</>
	)
}


export default AnecdoteList