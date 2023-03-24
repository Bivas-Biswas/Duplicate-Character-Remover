import clsx from 'clsx'
import { motion } from 'framer-motion'
import React from 'react'

import { CharacterColors } from '../removeduplicate.types'

type CharactersCardWrapperProps = {
  selectedCharId: number
  selectedChar: string
  onHover: (_isHover: boolean) => void
  onClick: () => void
  colors: CharacterColors
  haveDuplicate: boolean
  char: string
  id: number
}

const CharacterCard = (props: CharactersCardWrapperProps) => {
  const {
    selectedChar,
    selectedCharId,
    haveDuplicate,
    char,
    id,
    onHover,
    onClick,
    colors
  } = props

  const isSameCharacterCard = selectedCharId === id
  const isSameCharacter = selectedChar === char

  const backgroundColor = haveDuplicate
    ? isSameCharacter
      ? colors.light
      : !selectedChar
      ? colors.light
      : '#374151'
    : '#374151'

  const color = haveDuplicate
    ? isSameCharacter
      ? colors.dark
      : !selectedChar
      ? colors.dark
      : '#4b5563'
    : '#4b5563'

  const boxShadow =
    haveDuplicate && isSameCharacterCard ? '#94a3b8 0px 2px 8px' : 'none'
  const border = isSameCharacterCard ? '#94a3b8 solid 1px' : 'none'
  const scale = haveDuplicate && isSameCharacterCard ? 1.1 : 1

  return (
    <motion.div
      layout
      data-id={id}
      data-char={char}
      exit={{ rotate: 360, opacity: 0 }}
      onHoverStart={() => {
        haveDuplicate && onHover(true)
      }}
      onHoverEnd={() => {
        haveDuplicate && onHover(false)
      }}
      onClick={onClick}
      initial={false}
      animate={{
        backgroundColor,
        color,
        scale
      }}
      style={{
        boxShadow,
        border
      }}
      className={clsx(
        'relative w-14 h-14 sm:w-20 sm:h-20 rounded font-medium text-4xl sm:text-6xl flex items-center justify-center overflow-hidden',
        !haveDuplicate ? 'cursor-not-allowed' : 'cursor-pointer'
      )}>
      <p>{char}</p>
    </motion.div>
  )
}

export default CharacterCard
