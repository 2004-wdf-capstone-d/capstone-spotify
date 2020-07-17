import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="top-level-page has-background-dark is-bold has-text-light">
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
