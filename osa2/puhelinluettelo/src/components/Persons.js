import React from 'react'

const Persons = ({ persons, filter }) => {
    let newPersons = []
    if(filter === '') {
      newPersons = persons.concat()
    }
    else {
      persons.forEach(element => {
        if(element.name.toLowerCase().includes(filter.toLowerCase())){
          newPersons.push(element)
        }        
      })
    }
  
    return (
      <div>
        {newPersons.map(person =>
        <Person key={person.name} person={person} />
        )}
      </div>
    )
  }
  
  const Person = (props) => {
    return (
      <p>
        {props.person.name} {props.person.number}
      </p>
    )
  }

  export default Persons