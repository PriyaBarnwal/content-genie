import './styles/App.css'
import React from 'react'
import { Provider} from 'react-redux'
import store from './store'
import Header from './components/Header'
import HomeScreen from './components/HomeScreen'

export const App = () => {

  return (
    <Provider store={store}>
    <div className="app">
      <Header />
      <HomeScreen />
    </div>
    </Provider>
  )
}