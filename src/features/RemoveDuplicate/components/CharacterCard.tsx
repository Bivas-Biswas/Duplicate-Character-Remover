import React from 'react'
import { CharacterColors, CharacterObject } from 'types'

type CharacterCardPropsType = {
  handleRemoveDuplicate: (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
  colors: CharacterColors
} & CharacterObject

const CharacterCard = ({
  char,
  id,
  handleRemoveDuplicate,
  colors
}: CharacterCardPropsType) => {
  const { dark, light } = colors
  return (
    <div
      data-id={id}
      data-char={char}
      style={{
        backgroundColor: light,
        color: dark
      }}
      className={
        'w-20 h-20 cursor-pointer rounded font-medium text-6xl flex items-center justify-center'
      }
      onClick={handleRemoveDuplicate}>
      <p>{char}</p>
    </div>
  )
}

export default CharacterCard
