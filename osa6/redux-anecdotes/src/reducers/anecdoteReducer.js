import anecdoteService from '../services/anecdotes'

// Nämä ei enää käytössä, kun json-server lisättiin
// const anecdotesAtStart = [
// 	'If it hurts, do it more often',
// 	'Adding manpower to a late software project makes it later!',
// 	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
// 	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
// 	'Premature optimization is the root of all evil.',
// 	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const initialState = anecdotesAtStart.map(asObject)
// const getId = () => (100000 * Math.random()).toFixed(0)

// Ei enää tarpeellinen
// const asObject = (anecdote) => {
// 	return {
// 		content: anecdote,
// 		id: getId(),
// 		votes: 0
// 	}
// }

const sortByVotes = (anecdotes) => (
	anecdotes.sort((a, b) =>  b.votes - a.votes)
)


export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes,
		})
	}
}


export const createVote = (id) => {
	return async dispatch => {

		const oldAnecdote = await anecdoteService.getOne(id)
		const changedAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 }
		await anecdoteService.vote(changedAnecdote)

		dispatch({
			type: 'VOTE',
			data: changedAnecdote
		})
	}
}


export const addAnecdote = (content) => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch({
			type: 'NEW_ANECDOTE',
			data: newAnecdote,
		})

	}
}


const anecdoteReducer = (state = [], action) => {

	switch(action.type) {

	case 'INIT_ANECDOTES':
		return sortByVotes(action.data)

	case 'VOTE': {
		const changedAnecdote = action.data
		const newAnecdotes = state.map(anecdote =>
			anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
		)
		return sortByVotes(newAnecdotes)
	}

	case 'NEW_ANECDOTE': {
		return [...state, action.data]
	}

	default:
		return state
	}

}

export default anecdoteReducer