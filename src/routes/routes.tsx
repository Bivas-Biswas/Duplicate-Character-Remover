import React, { lazy } from 'react'
import { RouteProps } from 'react-router-dom'

const HomePageLazy = lazy(() => import('pages/Home'))
const RemoveDuplicatePageLazy = lazy(() => import('pages/RemoveDuplicate'))
const AboutPageLazy = lazy(() => import('pages/About'))
const ContactPageLazy = lazy(() => import('pages/Contact'))
const TestPageLazy = lazy(() => import('pages/Test'))
const Page404Lazy = lazy(() => import('pages/Page404'))

const routes: RouteProps[] = [
  {
    path: '/',
    element: <HomePageLazy />,
    errorElement: <Page404Lazy />
  },
  {
    path: '/:string',
    element: <RemoveDuplicatePageLazy />
  },
  {
    path: '/about',
    element: <AboutPageLazy />
  },
  {
    path: '/contact',
    element: <ContactPageLazy />
  },
  {
    path: '/test',
    element: <TestPageLazy />
  }
]

export default routes
