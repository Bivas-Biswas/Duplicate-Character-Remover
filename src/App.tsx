import React from 'react'
import { Toaster } from 'react-hot-toast'
import Routers from 'routes'

const App = () => {
  return (
    <>
      <Routers />
      <Toaster position={'top-right'} />
    </>
  )
}

export default App
