import React from 'react'

const PersonForm = ({ newName, handleNameFieldChange, newNumber, handleNumberFieldChange, addPerson }) => {
    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameFieldChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberFieldChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  export default PersonForm