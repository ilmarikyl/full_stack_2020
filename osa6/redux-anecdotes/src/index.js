import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'


// Tämä tulostaa consoleen jokaisen store-muutoksen jälkeen
// store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)