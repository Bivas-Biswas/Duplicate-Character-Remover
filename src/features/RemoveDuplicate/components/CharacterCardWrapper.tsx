import { AnimatePresence } from 'framer-motion'
import React from 'react'

type CharacterCardWrapperProps = {
  children: React.ReactNode | React.ReactNode[]
}
const CharacterCardWrapper = (props: CharacterCardWrapperProps) => {
  const { children } = props
  return (
    <div className={'flex flex-wrap gap-3 max-w-2xl justify-center'}>
      <AnimatePresence>{children}</AnimatePresence>
    </div>
  )
}

export default CharacterCardWrapper
