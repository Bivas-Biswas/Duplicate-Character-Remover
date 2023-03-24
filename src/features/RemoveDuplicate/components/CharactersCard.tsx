import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback } from 'react'

import { CharacterColors, CharacterObject } from '../removeduplicate.types'

type ArgType = {
  char: string
  id: number
  index: number
}

type CharactersCardWrapperProps = {
  characterColorObj: Record<string, CharacterColors>
  characters: CharacterObject[]
  characterCountObj: Record<string, number>
  selectedCharId: number
  selectedChar: string
  onHoverStart: (_arg: ArgType) => void
  onHoverEnd: (_arg: ArgType) => void
  onCardClick: (_arg: ArgType) => void
}

const CharactersCard = (props: CharactersCardWrapperProps) => {
  const {
    characterColorObj,
    characters,
    characterCountObj,
    onCardClick,
    onHoverEnd,
    onHoverStart,
    selectedChar,
    selectedCharId
  } = props

  const getSameCharacterStyle = useCallback(
    (
      char: string,
      property: 'backgroundColor' | 'color',
      haveDuplicate: boolean
    ) => {
      const style = {
        backgroundColor: {
          default: characterColorObj[char].light,
          disable: '#374151',
          select: characterColorObj[char].light
        },
        color: {
          default: characterColorObj[char].dark,
          disable: '#4b5563',
          select: characterColorObj[char].dark
        }
      } as const

      const propertyValue = style[property]

      if (haveDuplicate) {
        if (selectedCharId === -1) {
          return propertyValue.default
        }
        return selectedChar === char
          ? propertyValue.select
          : propertyValue.disable
      } else {
        return propertyValue.disable
      }
    },
    [characterColorObj, selectedChar, selectedCharId]
  )

  return (
    <div className={'flex flex-wrap gap-3 max-w-2xl justify-center'}>
      <AnimatePresence>
        {characters.map(({ char, id }, index) => {
          const haveDuplicate = characterCountObj[char] > 1
          const params = { char, id, index }
          const isSameCharacterCard = selectedCharId === id

          return (
            <motion.div
              key={id}
              layout
              data-id={id}
              data-char={char}
              exit={{ rotate: 360, opacity: 0 }}
              onHoverStart={() => {
                haveDuplicate && onHoverStart(params)
              }}
              onHoverEnd={() => {
                haveDuplicate && onHoverEnd(params)
              }}
              onClick={() => onCardClick(params)}
              initial={false}
              animate={{
                backgroundColor: getSameCharacterStyle(
                  char,
                  'backgroundColor',
                  haveDuplicate
                ),
                color: getSameCharacterStyle(char, 'color', haveDuplicate),
                scale: haveDuplicate && isSameCharacterCard ? 1.1 : 1
              }}
              style={{
                boxShadow: isSameCharacterCard ? '#94a3b8 0px 2px 8px' : 'none',
                border: isSameCharacterCard ? '#94a3b8 solid 1px' : 'none'
              }}
              className={clsx(
                'relative w-14 h-14 sm:w-20 sm:h-20 rounded font-medium text-4xl sm:text-6xl flex items-center justify-center overflow-hidden',
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

export default CharactersCard
