import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Title = ({ text }) => <h1>{text}</h1>

const StatisticLine = ({ text, value }) => {
  return (
    <>
      {text} {value}
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good > 0 || neutral > 0 || bad > 0 ) {
    let average = ((1 * good) + (0 * neutral) + (-1 * bad)) / (good + neutral + bad)
    let positive = good / (good + neutral + bad) * 100

    return (
      <table>
        <tbody>
          <tr>
            <td><StatisticLine text="good" value={good} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="neutral" value={neutral} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="bad" value={bad} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="all" value={good + neutral + bad} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="average" value={average.toFixed(1)} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="positive" value={positive.toFixed(1)} /> %</td>
          </tr>
        </tbody>
      </table>
        
        
    )
  }

  return (
    <div>
      No feedback given
    </div>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <Title text="give feedback"/>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <Title text="statistics"/>

      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)