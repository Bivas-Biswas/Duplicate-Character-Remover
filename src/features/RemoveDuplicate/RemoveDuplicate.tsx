import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CharacterColors, CharacterObject } from 'types'
import {
  checkRemovedAllDuplicateOrNot,
  getCharacterWiseRandomColors,
  getCountCharMap,
  getNoOfDuplicateChar
} from 'utils'

import CharacterCard from './components/CharacterCard'
import SuccessModal from './components/SuccessModal'

const RemoveDuplicate = () => {
  const { string: string_query } = useParams()
  const [characters, setCharacters] = useState<CharacterObject[] | null>(null)
  const [characterColorObj, setCharacterColorObj] = useState<Record<
    string,
    CharacterColors
  > | null>(null)

  const string = string_query || ''

  useEffect(() => {
    if (!string) return

    const charactersArray = string.split('')
    const newCharacters = charactersArray.map((char, idx) => ({
      char,
      id: idx + 1
    }))
    setCharacterColorObj(getCharacterWiseRandomColors(charactersArray))
    setCharacters(newCharacters)
  }, [string])

  const charactersArray = useMemo(() => {
    if (!characters) return
    return characters.map((charObj) => charObj.char)
  }, [characters])

  const chararcterCountObj = useMemo(() => {
    if (!charactersArray) return null
    return getCountCharMap(charactersArray)
  }, [charactersArray])

  const haveAnyDuplicate = useMemo(() => {
    if (!charactersArray) return false
    return checkRemovedAllDuplicateOrNot(charactersArray)
  }, [charactersArray])

  const noOfDuplicateChar = useMemo(() => {
    if (!chararcterCountObj) return null
    return getNoOfDuplicateChar(chararcterCountObj)
  }, [chararcterCountObj])

  const handleRemoveDuplicate = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { char, id } = event.currentTarget.dataset

      if (!char || !id || !characters || !chararcterCountObj) return

      const newCharacters = characters.filter((charObj) => {
        chararcterCountObj[charObj.char] = 1
        if (charObj.char === char) {
          return charObj.id === parseInt(id)
        } else {
          return true
        }
      })
      setCharacters(newCharacters)
    },
    [characters, chararcterCountObj]
  )

  const showSuccessModal = haveAnyDuplicate && !!characters && !!string

  return (
    <div className={'relative h-full flex flex-col items-center gap-4 mb-10'}>
      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          originalString={string}
          resultantString={characters.map((charObj) => charObj.char).join('')}
        />
      )}
      <div>
        <p>{noOfDuplicateChar}</p>
      </div>
      <motion.div className={'flex flex-wrap gap-4 max-w-2xl'}>
        <AnimatePresence>
          {characters &&
            characterColorObj &&
            characters.map((charObj) => {
              return (
                <motion.div
                  key={charObj.id}
                  layout
                  exit={{ rotate: 360, opacity: 0 }}
                  whileHover={{
                    scale: 1.1,
                    transition: { ease: 'easeOut', duration: 0.2 }
                  }}>
                  <CharacterCard
                    key={charObj.id}
                    char={charObj.char}
                    id={charObj.id}
                    colors={characterColorObj[charObj.char]}
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

RemoveDuplicate.layout = {
  hideFooter: true
}

export default RemoveDuplicate
