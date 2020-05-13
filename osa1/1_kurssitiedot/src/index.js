import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => {
  console.log(parts)
  return (
    <>
      <Part name={parts[0].name} numExercises={parts[0].numExercises} />
      <Part name={parts[1].name} numExercises={parts[1].numExercises} />
      <Part name={parts[2].name} numExercises={parts[2].numExercises} />
    </>
  )
}

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ name, numExercises }) => <p>{name} {numExercises}</p>

const App = () => {

  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
        { name: 'Reactin perusteet', numExercises: 10 },
        { name: 'Tiedonvälitys propseilla', numExercises: 7 },
        { name: 'Komponenttien tila', numExercises: 14  }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total sum={course.parts[0].numExercises + course.parts[1].numExercises + course.parts[2].numExercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))