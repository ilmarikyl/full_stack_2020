import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({ anecdotes, topIndex, votes }) => {
  if (topIndex > -1) {
    return (
      <>
        <div>
          {anecdotes[topIndex]}
        </div>
        <div>
          has {votes[topIndex]} votes
        </div>
      </>
    )
  }
  return <div>No one has voted yet.</div> 
}

const App = (props) => {

  const Random = () => Math.floor(Math.random() * props.anecdotes.length)
  let first = Random()

  const [selected, setSelected] = useState(first)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
  const [topIndex, setTopIndex] = useState(-1)

  const handleNextRandom = () => {
    let rand = Random()
    setSelected(rand)
    console.log(rand)
  }

  const handleVoteClick = () => {
    const newVotes = {...votes}
    newVotes[selected] += 1
    setVotes(newVotes)
    let oldBest = newVotes[topIndex]

    if (!oldBest) oldBest = -1

    if (newVotes[selected] > oldBest){
      setTopIndex(selected)
    }
  }

  return (
    <div>
      <Title text="Anecdote of the day"/>
      <div>{props.anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <div>
        <Button onClick={handleVoteClick} text="vote"/>
        <Button onClick={handleNextRandom} text="next anecdote"/>
        <Title text="Anecdote with most votes"/>
        <Statistics topIndex={topIndex} anecdotes={props.anecdotes} votes={votes}/>
      </div>

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)