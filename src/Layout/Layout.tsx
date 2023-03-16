import React from 'react'

import Navbar from './Navbar'

export type LayoutProps = {
  children?: React.ReactNode | React.ReactNode[]
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={'bg-background text-secondary'}>
      <div className={'flex flex-col min-h-screen'}>
        <Navbar />
        <div
          className={
            'flex flex-col flex-1 max-w-3xl w-full mx-auto scrollbar h-full px-4'
          }>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
