import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {Example} from './components/example'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Example />
    </div>
  )
}

export default App
