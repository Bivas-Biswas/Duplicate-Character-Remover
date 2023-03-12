import { Layout } from 'Layout'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import routes from './routes'

const Routers = () => {
  return (
    <Routes>
      {routes.map((route) => {
        const Component = route.Component
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Layout {...(Component.layout || {})}>
                <Component />
              </Layout>
            }
            errorElement={route.errorElement}
          />
        )
      })}
    </Routes>
  )
}

export default Routers
