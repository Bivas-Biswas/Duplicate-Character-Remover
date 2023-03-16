import { Layout } from 'Layout'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Loading } from '../components'

import routes from './routes'

const Routers = () => {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
                errorElement={route.errorElement}
              />
            )
          })}
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default Routers
