import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import SearchResultView from './components/SearchResultView'


const App = () => {

  const [ countries, setCountries] = useState([])
  const [ searchWord, setSearchWord ] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])
  
  const handleSearchFieldChange = (event) => setSearchWord(event.target.value)
  const filterCountries = (country) => country.name.toLowerCase().includes(searchWord.toLowerCase())
  const setFilterToOneCountry = (country) => setSearchWord(country.name)

  return (
    <div>
      <Filter
        searchWord={searchWord}
        handleSearchFieldChange={handleSearchFieldChange}
      />
      <SearchResultView
        countries={countries.filter(filterCountries)}
        setFilterToOneCountry={setFilterToOneCountry}
        numberOfCountries={countries.length}
      />
    </div>
  )
}

export default App
