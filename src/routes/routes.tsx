import { LayoutProps } from 'Layout'
import React from 'react'

import { HomePage, Page404, RemoveDuplicatePage, TestPage } from '../pages'

export type ComponentType = {
  (): React.ReactElement
  layout?: LayoutProps
  // seo?:
}

type RoutesType = {
  path: string
  Component: ComponentType
  errorElement?: React.ReactNode
}

const routes: RoutesType[] = [
  {
    path: '/',
    Component: HomePage,
    errorElement: <Page404 />
  },
  {
    path: '/remove-duplicates/:string',
    Component: RemoveDuplicatePage
  },
  {
    path: '/test',
    Component: TestPage
  }
]

export default routes