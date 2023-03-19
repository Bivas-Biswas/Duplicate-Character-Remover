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

const CharactersCardWrapper = (props: CharactersCardWrapperProps) => {
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

  const getStyle = useCallback(
    (
      char: string,
      property: 'backgroundColor' | 'color' | 'scale' | 'border'
    ) => {
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
        },
        border: {
          default: 'none',
          disable: 'none',
          hover: 'red solid 2px'
        }
      } as const

      const propertyValue = style[property]

      if (characterCountObj[char] > 1) {
        return selectedChar
          ? selectedChar === char
            ? propertyValue.hover
            : propertyValue.disable
          : propertyValue.default
      } else {
        return propertyValue.disable
      }
    },
    [characterColorObj, characterCountObj, selectedChar]
  )

  return (
    <div className={'flex flex-wrap gap-3 max-w-2xl justify-center'}>
      <AnimatePresence>
        {characters.map(({ char, id }, index) => {
          const haveDuplicate = characterCountObj[char] > 1
          const params = { char, id, index }
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
                onHoverEnd(params)
              }}
              // role="button"
              // aria-pressed={id === selectedIndex}
              // tabIndex={0}
              onClick={() => onCardClick(params)}
              initial={false}
              animate={{
                backgroundColor: getStyle(char, 'backgroundColor') as string,
                color: getStyle(char, 'color') as string,
                scale: selectedCharId === id ? 1.1 : 1
              }}
              style={{
                boxShadow:
                  selectedCharId === id ? '#94a3b8 0px 2px 8px' : 'none',
                border: selectedCharId === id ? '#94a3b8 solid 1px' : 'none'
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

export default CharactersCardWrapper
