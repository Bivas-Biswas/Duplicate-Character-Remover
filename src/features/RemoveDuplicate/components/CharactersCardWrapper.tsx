import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useState } from 'react'

import { CharacterColors, CharacterObject } from '../removeduplicate.types'

type CharactersCardWrapperProps = {
  characterColorObj: Record<string, CharacterColors>
  characters: CharacterObject[]
  setCharacters: React.Dispatch<React.SetStateAction<CharacterObject[] | null>>
  characterCountObj: Record<string, number>
}

const CharactersCardWrapper = (props: CharactersCardWrapperProps) => {
  const { characterColorObj, characters, setCharacters, characterCountObj } =
    props

  const [hoverChar, setHoverChar] = useState<CharacterObject | null>(null)

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
      setHoverChar(null)
    },
    [characters, characterCountObj, setCharacters]
  )

  const getStyle = useCallback(
    (char: string, property: 'backgroundColor' | 'color' | 'scale') => {
      const style = {
        backgroundColor: {
          default: characterColorObj[char].light,
          disable: '#374151',
          hover: characterColorObj[char].light
        },
        color: {
          default: characterColorObj[char].dark,
          disable: '#4b5563',
          hover: characterColorObj[char].dark
        },
        scale: {
          default: 1,
          disable: 1,
          hover: 1.1
        }
      } as const

      const propertyValue = style[property]

      if (characterCountObj[char] > 1) {
        return hoverChar
          ? hoverChar.char === char
            ? propertyValue.hover
            : propertyValue.disable
          : propertyValue.default
      } else {
        return propertyValue.disable
      }
    },
    [characterColorObj, characterCountObj, hoverChar]
  )

  return (
    <div className={'flex flex-wrap gap-4 max-w-2xl justify-center'}>
      <AnimatePresence>
        {characters.map((charObj) => {
          const { char, id } = charObj
          const haveDuplicate = characterCountObj[char] > 1

          return (
            <motion.div
              key={id}
              layout
              data-id={id}
              data-char={char}
              exit={{ rotate: 360, opacity: 0 }}
              onHoverStart={() => {
                if (haveDuplicate) {
                  setHoverChar({ char, id })
                }
              }}
              onHoverEnd={() => {
                setHoverChar(null)
              }}
              onClick={handleRemoveDuplicate}
              initial={false}
              animate={{
                backgroundColor: getStyle(char, 'backgroundColor') as string,
                color: getStyle(char, 'color') as string,
                scale: getStyle(char, 'scale')
              }}
              className={clsx(
                'relative w-20 h-20 rounded font-medium text-6xl flex items-center justify-center overflow-hidden',
                !haveDuplicate ? 'cursor-not-allowed' : 'cursor-pointer'
              )}>
              <p>{char}</p>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default CharactersCardWrapper
