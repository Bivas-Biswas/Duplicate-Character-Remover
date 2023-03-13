import clsx from 'clsx'
import React from 'react'

import { Footer, Navbar } from './index'

export type LayoutProps = {
  children?: React.ReactNode | React.ReactNode[]
  hideFooter?: boolean
  hideNavbar?: boolean
  pageClassName?: string
  className?: string
}

const Layout = ({
  children,
  className,
  pageClassName,
  hideFooter,
  hideNavbar
}: LayoutProps) => {
  return (
    <div className={clsx('bg-background text-secondary', className)}>
      <div className={clsx('flex flex-col min-h-screen')}>
        {!hideNavbar && <Navbar />}
        <div
          className={clsx(
            'flex flex-col flex-1 max-w-5xl w-full mx-auto scrollbar h-full',
            pageClassName
          )}>
          {children}
        </div>
      </div>

      {!hideFooter && <Footer />}
    </div>
  )
}

export default Layout
