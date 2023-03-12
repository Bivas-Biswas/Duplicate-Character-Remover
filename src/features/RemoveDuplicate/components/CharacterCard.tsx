import React from 'react'
import { CharacterObject } from 'types'

type CharacterCardPropsType = {
  handleRemoveDuplicate: (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>
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
      onClick={handleRemoveDuplicate}>
      <p>{char}</p>
    </div>
  )
}

export default CharacterCard
