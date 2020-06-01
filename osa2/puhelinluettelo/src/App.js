import React, { useState, useEffect } from 'react'
import './index.css'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'


const Notification = ({ notificationSuccessful, message }) => {
  if (message === null) return null
  if (notificationSuccessful === true) return <div className='notification-success'>{message}</div>

  return <div className='notification-fail'>{message}</div>
}


const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ notificationSuccessful, setNotificationSuccessful ] = useState(true)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  
  useEffect(hook, [])

  const handleNameFieldChange = (event) => setNewName(event.target.value)
  const handleNumberFieldChange = (event) => setNewNumber(event.target.value)
  const handleFilterFieldChange = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const names = persons.map(person => person.name)

    if (names.includes(newName)) {
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: personObject.number }

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Updated the number of ${returnedPerson.name}`)
          setNotificationSuccessful(true)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
          })
          .catch(error => {
            setNotificationMessage(`Information of '${changedPerson.name}' has already been removed from server`)
            setNotificationSuccessful(false)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.name !== changedPerson.name))
            setNewName('')
            setNewNumber('')
          })
      }
    }
    
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setNotificationSuccessful(true)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
    }   
  }

  const deletePerson = delPerson => {
    if (window.confirm(`Delete ${delPerson.name} ?`)) {
      personService
        .remove(delPerson)
        .then(response => {
          setPersons(persons.filter(person => person.name !== delPerson.name))
          setNotificationMessage(`Deleted ${delPerson.name}`)
          setNotificationSuccessful(true)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
        .catch(error => {
          setNotificationMessage(`The number of '${delPerson.name}' was already removed from server`)
          setNotificationSuccessful(false)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.name !== delPerson.name))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationSuccessful={notificationSuccessful} message={notificationMessage} />
      <Filter
        filter={newFilter}
        handleFilterFieldChange={handleFilterFieldChange}
      />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameFieldChange={handleNameFieldChange}
        handleNumberFieldChange={handleNumberFieldChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App