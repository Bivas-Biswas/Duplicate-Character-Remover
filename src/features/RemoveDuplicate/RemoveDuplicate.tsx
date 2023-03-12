import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { CharacterObject } from 'types'
import {
  checkRemovedAllDuplicateOrNot,
  getCharacterWiseRandomColors
} from 'utils'

import CharacterCard from './components/CharacterCard'

const RemoveDuplicate = () => {
  const { string } = useParams()
  const [characters, setCharacters] = useState<CharacterObject[]>([])
  const [haveAnyDuplicate, setHavAnyDuplicate] = useState(false)

  useEffect(() => {
    if (!string) return

    const stringArray = string.split('')
    const characterColorMap = getCharacterWiseRandomColors(stringArray)

    const newCharacters = stringArray.map((char, idx) => ({
      char,
      id: idx + 1,
      colors: characterColorMap[char]
    }))
    setCharacters(newCharacters)

    const currenlyHaveAnyDuplicate = checkRemovedAllDuplicateOrNot(stringArray)

    setHavAnyDuplicate(currenlyHaveAnyDuplicate)
  }, [string])

  const handleRemoveDuplicate = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { char, id } = event.currentTarget.dataset

    if (!char || !id) return

    const newCharacters = characters.filter((charObj) => {
      if (charObj.char === char) {
        return charObj.id === parseInt(id)
      } else {
        return true
      }
    })

    const currenlyHaveAnyDuplicate = checkRemovedAllDuplicateOrNot(
      newCharacters.map((charObj) => charObj.char)
    )

    currenlyHaveAnyDuplicate && toast.success('Removed All Duplicate')

    setHavAnyDuplicate(currenlyHaveAnyDuplicate)

    setCharacters(newCharacters)
  }

  return (
    <div className={'flex flex-col items-center gap-4'}>
      <div>Done - {haveAnyDuplicate ? 'yes' : 'not'}</div>

      <motion.div className={'flex flex-wrap gap-6 justify-center'}>
        <AnimatePresence>
          {characters.map((charObj) => {
            return (
              <motion.div
                key={charObj.id}
                layout
                initial={{ rotate: 10 }}
                exit={{ rotate: 360, opacity: 0 }}
                whileHover={{ rotate: 0, transition: { ease: 'easeOut' } }}>
                <CharacterCard
                  key={charObj.id}
                  {...charObj}
                  handleRemoveDuplicate={handleRemoveDuplicate}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default RemoveDuplicate
