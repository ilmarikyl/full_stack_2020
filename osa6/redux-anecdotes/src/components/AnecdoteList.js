import React from 'react'
import { connect } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {


	const voteAnecdote = (id) => {
		const votedAnecdote = props.anecdotes.find(n => n.id === id)
		props.createVote(id)
		props.setNotification(`you voted "${votedAnecdote.content}"`, 5)
	}

	return (
		<>
			{props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
	const filteredAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))

	return {
		anecdotes: filteredAnecdotes,
		filter: state.filter,
	}
}

const mapDispatchToProps = {
	createVote,
	setNotification
}

const ConnectedAnecdoteList = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteList)


export default ConnectedAnecdoteList
