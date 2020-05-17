import React from 'react'

const Filter = ({ filter, handleFilterFieldChange }) => {
    return (
      <div>
        filter shown with <input value={filter} onChange={handleFilterFieldChange} />
      </div>
    )
  }

  export default Filter