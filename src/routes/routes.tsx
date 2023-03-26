import React, { lazy } from 'react'
import { RouteProps } from 'react-router-dom'

import { HomePage, RemoveDuplicatePage } from '../pages'

// const AboutPageLazy = lazy(() => import('pages/About'))
const ContactPageLazy = lazy(() => import('pages/Contact'))
const TestPageLazy = lazy(() => import('pages/Test'))

const routes: RouteProps[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/:string',
    element: <RemoveDuplicatePage />
  },
  // {
  //   path: '/about',
  //   element: <AboutPageLazy />
  // },
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
