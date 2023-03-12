import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

const Test = () => {
  const [slectedChar, setSlectedChar] = useState<{
    x: number
    y: number
  } | null>(null)

  // console.log(y)
  const handleOnClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { char, id } = event.currentTarget.dataset

    if (!char || !id) return

    const getBoundingClientRect = event.currentTarget.getBoundingClientRect()
    const { x, y } = getBoundingClientRect
    setSlectedChar({ x, y })
  }

  return (
    <div className={'relative mt-10 flex w-full justify-center gap-10'}>
      <AnimatePresence>
        <motion.div
          key={'1'}
          animate={slectedChar ? { x: slectedChar.x, y: slectedChar.y } : {}}
          data-id={'1'}
          data-char={'a'}
          className="w-20 h-20 bg-green-500"
          onClick={handleOnClick}></motion.div>
        <motion.div
          key={'2'}
          data-id={'2'}
          data-char={'b'}
          animate={{ x: 1, y: 0 }}
          // exit={{ x: slectedChar.x, y: slectedChar.y }}
          className="w-20 h-20 bg-blue-500"
          onClick={handleOnClick}></motion.div>
      </AnimatePresence>
    </div>
  )
}

Test.layout = {
  className: 'bg-gray-900'
}

export default Test
