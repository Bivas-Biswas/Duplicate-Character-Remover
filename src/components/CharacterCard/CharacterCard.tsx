import React from 'react'

import { CharacterObject } from '../../types'

type CharacterCardPropsType = {
  handleRemoveDuplicate: (
    _char: CharacterObject['char'],
    _id: CharacterObject['id']
  ) => void
} & CharacterObject

const CharacterCard = ({
  char,
  id,
  handleRemoveDuplicate,
  colors
}: CharacterCardPropsType) => {
  const { fontColor, backGroundColor } = colors
  return (
    <div
      data-id={id}
      data-char={char}
      style={{
        backgroundColor: backGroundColor,
        color: fontColor
      }}
      className={'py-0 px-5 cursor-pointer rounded font-medium text-8xl'}
      onClick={() => handleRemoveDuplicate(char, id)}>
      <p>{char}</p>
    </div>
  )
}

export default CharacterCard
