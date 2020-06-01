import React from 'react'

const Persons = ({ persons, filter, deletePerson }) => {

  let newPersons = []
  if (filter === '') {
    newPersons = persons.concat()
  }
  else {
    persons.forEach(element => {
      if (element.name.toLowerCase().includes(filter.toLowerCase())){
        newPersons.push(element)
      }        
    })
  }

  return (
    <div>
      {newPersons.map(person =>
      <p key={person.name}>
        <Person
          key={person.name}
          person={person}
          deletePerson={deletePerson}
        />
        { " " } <button onClick={() => deletePerson(person)}>delete</button> 
      </p>
      )}
    </div>
  )
}


const Person = ( {person} ) => {
  return (
    <>
      {person.name} {person.number}
    </>
  )
}

export default Persons