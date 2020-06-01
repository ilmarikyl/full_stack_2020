import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const SearchResultView = ( {countries, setFilterToOneCountry, numberOfCountries} ) => {

    if (countries.length > 10) {
      const returnText = (countries.length === numberOfCountries) ? "Type a search word" : "Too many matches, specify another filter"
  
      return <p>{returnText}</p>
    }
  
    else if (countries.length === 1) {
      return <CountryInformation country={countries[0]} />
    }
  
    return (
      <ul>
        {countries.map(country =>
        <li key={country.name}>
          {country.name} <button onClick={() => setFilterToOneCountry(country)}>show</button>
        </li>
        )}
      </ul>
    )
  }
  
  
  const CountryInformation = ({ country }) => {
      const altText = `The flag of ${country.name}`
    return (
      <div>
          <h2>{country.name}</h2>
          <p>
            capital {country.capital}
            <br/>
            population {country.population}
          </p>
          <h3>Spoken languages</h3>
          <ul>
            {country.languages.map(language =>
              <li key={language.name} >{language.name}</li>
            )}
          </ul>
          <img src={country.flag} width="200" border="1" alt={altText} />
            <Weather country={country} />
  
        </div>
    )
  }
  
  const Weather = ( {country} ) => {
    const [ weather, setWeather] = useState()
    const hook = () => {
  
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query="${country.capital}, ${country.name}"`)
      .then(response => {
        setWeather(response.data)
      })
    }
    useEffect(hook, [])

    if (weather && country.name === weather.location.country) {
      
      return (
        <div>
          <h3>Weather in {weather.location.name}</h3>
          <p><b>temperature : </b> {weather.current.temperature} ℃</p>
          <p><img src={weather.current.weather_icons[0]} width="50" border="1" alt="Weather icon"/></p>
          <p><b>wind : </b> {weather.current.wind_speed} m/s direction {weather.current.wind_dir}</p>
        </div>
      )
    }
    
    return <></>
    
  }

  export default SearchResultView

