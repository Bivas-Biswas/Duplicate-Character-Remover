import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useRef } from 'react'

import { CharacterColors, CharacterObject } from '../removeduplicate.types'

import CharacterCard from './CharacterCard'

type CharactersCardWrapperProps = {
  characterColorObj: Record<string, CharacterColors>
  characters: CharacterObject[]
  setCharacters: React.Dispatch<React.SetStateAction<CharacterObject[] | null>>
  characterCountObj: Record<string, number>
}

const CharactersCardWrapper = (props: CharactersCardWrapperProps) => {
  const { characterColorObj, characters, setCharacters, characterCountObj } =
    props

  const characterElementsRef = useRef<Map<
    string,
    { id: number; node: HTMLDivElement }[]
  > | null>(null)

  const getCharacterElementsMap = useCallback(() => {
    if (!characterElementsRef.current) {
      // Initialize the Map on first usage.
      characterElementsRef.current = new Map()
    }
    return characterElementsRef.current
  }, [])
  // mange char element refs
  const handleAssignRef = useCallback(
    ({ char, id, node }: { node: HTMLDivElement | null } & CharacterObject) => {
      const characterElementsMap = getCharacterElementsMap()
      if (node) {
        if (characterElementsMap.has(char)) {
          const value = characterElementsMap.get(char)
          value && characterElementsMap.set(char, [...value, { id, node }])
        } else {
          characterElementsMap.set(char, [{ id, node }])
        }
      } else {
        characterElementsMap.delete(char)
      }
    },
    [getCharacterElementsMap]
  )

  const handleSameCharElement = useCallback(
    (char: string, callback: (_ele: HTMLDivElement) => void) => {
      const characterElementsMap = getCharacterElementsMap()
      const sameElements = characterElementsMap.get(char)

      if (sameElements) {
        for (const { node } of sameElements) {
          if (node) {
            callback(node)
          }
        }
      }
    },
    [getCharacterElementsMap]
  )

  const handleRemoveDuplicate = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { char, id } = event.currentTarget.dataset

      if (!char || !id) return

      const newCharacters = characters.filter((charObj) => {
        characterCountObj[charObj.char] = 1
        if (charObj.char === char) {
          return charObj.id === parseInt(id)
        } else {
          return true
        }
      })
      setCharacters(newCharacters)

      // clear memory
      const characterElementsMap = getCharacterElementsMap()

      const sameElements = characterElementsMap.get(char)

      if (sameElements) {
        const newSameElements = sameElements.filter(
          (eleObj) => eleObj.id === parseInt(id)
        )
        characterElementsMap.set(char, newSameElements)
      }
    },
    [characters, characterCountObj, getCharacterElementsMap, setCharacters]
  )
  return (
    <div className={'flex flex-wrap gap-4 max-w-2xl'}>
      <AnimatePresence>
        {characters.map((charObj) => {
          const { char, id } = charObj
          return (
            <motion.div
              ref={(node) => handleAssignRef({ char, id, node })}
              key={id}
              layout
              exit={{ rotate: 360, opacity: 0 }}
              onMouseEnter={() => {
                handleSameCharElement(char, (ele) => {
                  ele.style.transform = 'scale(1.1)'
                })
              }}
              onHoverEnd={() => {
                handleSameCharElement(char, (ele) => {
                  ele.style.transform = 'scale(1)'
                })
              }}
              onMouseLeave={() => {
                handleSameCharElement(char, (ele) => {
                  ele.style.transform = 'scale(1)'
                })
              }}>
              <CharacterCard
                char={char}
                id={id}
                colors={characterColorObj[char]}
                handleRemoveDuplicate={handleRemoveDuplicate}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default CharactersCardWrapper
