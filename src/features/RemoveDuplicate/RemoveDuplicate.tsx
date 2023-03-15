import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CharacterObject } from 'types'
import {
  checkRemovedAllDuplicateOrNot,
  getCharacterWiseRandomColors,
  getCountCharMap
} from 'utils'

import { CharactersCardWrapper, SuccessModal } from './components'

const RemoveDuplicate = () => {
  const { string } = useParams()
  const [characters, setCharacters] = useState<CharacterObject[] | null>(null)

  useEffect(() => {
    if (!string) return

    const charactersArray = string.split('')
    const newCharacters = charactersArray.map((char, idx) => ({
      char,
      id: idx + 1
    }))
    setCharacters(newCharacters)
  }, [string])

  const characterColorObj = useMemo(() => {
    if (!string) return null
    return getCharacterWiseRandomColors(string.split(''))
  }, [string])

  const charactersArray = useMemo(() => {
    if (!characters) return
    return characters.map((charObj) => charObj.char)
  }, [characters])

  const characterCountObj = useMemo(() => {
    if (!charactersArray) return null
    return getCountCharMap(charactersArray)
  }, [charactersArray])

  const haveAnyDuplicate = useMemo(() => {
    if (!charactersArray) return false
    return checkRemovedAllDuplicateOrNot(charactersArray)
  }, [charactersArray])

  // const noOfDuplicateChar = useMemo(() => {
  //   if (!characterCountObj) return null
  //   return getNoOfDuplicateChar(characterCountObj)
  // }, [characterCountObj])

  const showSuccessModal = haveAnyDuplicate && !!characters && !!string
  const showCharactersCardWrapper =
    characterCountObj && characterColorObj && characters

  return (
    <div className={'h-full flex flex-col items-center gap-3 py-8 sm:py-20'}>
      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          originalString={string}
          resultantString={characters.map((charObj) => charObj.char).join('')}
        />
      )}
      {/* <div> */}
      {/*  <p>{noOfDuplicateChar}</p> */}
      {/* </div> */}
      {showCharactersCardWrapper && (
        <CharactersCardWrapper
          characterCountObj={characterCountObj}
          characterColorObj={characterColorObj}
          characters={characters}
          setCharacters={setCharacters}
        />
      )}
    </div>
  )
}

RemoveDuplicate.layout = {
  hideFooter: true
}

export default RemoveDuplicate
