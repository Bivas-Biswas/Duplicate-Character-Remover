import React from 'react'
import { CharacterColors } from 'types'

type CharacterCardPropsType = {
  handleRemoveDuplicate?: (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
  colors: CharacterColors
  char: string
}

const CharacterCard = ({ char, colors }: CharacterCardPropsType) => {
  const { dark, light } = colors
  return (
    <div style={{ color: dark, backgroundColor: light }}>
      <p>{char}</p>
    </div>
  )
}

export default CharacterCard
