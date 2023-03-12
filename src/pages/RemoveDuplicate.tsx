import { CharacterCard } from 'components'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CharacterObject } from 'types'
import {
  checkRemovedAllDuplicateOrNot,
  getCharacterWiseRandomColors
} from 'utils'

const RemoveDuplicate = () => {
  const { string } = useParams()
  const [characters, setCharacters] = useState<CharacterObject[]>([])
  const [haveAnyDuplicate, setHavAnyDuplicate] = useState(false)

  useEffect(() => {
    if (!string) return

    const stringArray = string.split('')
    const characterColorMap = getCharacterWiseRandomColors(stringArray)

    const newCharacters = stringArray.map((char, idx) => ({
      char,
      id: idx + 1,
      colors: characterColorMap[char]
    }))
    setCharacters(newCharacters)

    const currenlyHaveAnyDuplicate = checkRemovedAllDuplicateOrNot(stringArray)

    setHavAnyDuplicate(currenlyHaveAnyDuplicate)
  }, [string])

  const handleRemoveDuplicate = (
    char: CharacterObject['char'],
    id: CharacterObject['id']
  ) => {
    const newCharacters = characters.filter((charObj) => {
      if (charObj.char === char) {
        return charObj.id === id
      } else {
        return true
      }
    })

    const currenlyHaveAnyDuplicate = checkRemovedAllDuplicateOrNot(
      newCharacters.map((charObj) => charObj.char)
    )

    setHavAnyDuplicate(currenlyHaveAnyDuplicate)

    setCharacters(newCharacters)
  }

  return (
    <div className={'flex flex-col items-center gap-4'}>
      <div>Done - {haveAnyDuplicate ? 'yes' : 'not'}</div>
      <div className="flex flex-wrap gap-3">
        {characters.map((charObj) => {
          return (
            <CharacterCard
              key={charObj.id}
              {...charObj}
              handleRemoveDuplicate={handleRemoveDuplicate}
            />
          )
        })}
      </div>
    </div>
  )
}

RemoveDuplicate.layout = {
  className: 'bg-gray-900'
}

export default RemoveDuplicate
