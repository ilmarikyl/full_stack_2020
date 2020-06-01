import React from 'react'

const Filter = ({ searchWord, handleSearchFieldChange }) => {
  return (
    <div>
      find countries <input value={searchWord} onChange={handleSearchFieldChange} />
    </div>
  )
}

export default Filter