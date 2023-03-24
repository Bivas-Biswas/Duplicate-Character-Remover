import { Layout } from 'Layout'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Loading } from '../components'

import routes from './routes'

const Page404Lazy = lazy(() => import('pages/Page404'))

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
          <Route path={'*'} element={<Page404Lazy />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default Routers
