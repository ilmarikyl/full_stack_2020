import React from 'react';
import ReactDOM from 'react-dom';


const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  
  const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)
    const sum = exercises.reduce( (a, b) => a + b)
  
    return(
      <div>
        <b>total of {sum} exercises</b>
      </div>
    ) 
  }
  
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  
  const Content = ({ parts }) => { 
    return (
      <>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </>
    )
  }
  
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  export default Course