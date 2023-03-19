import { RemoveWhiteSpaceModal } from 'components'
import { useKeyPress } from 'hooks'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CharacterObject } from 'types'
import {
  checkRemovedAllDuplicateOrNot,
  getCharacterWiseRandomColors,
  getCountCharMap,
  hasWhiteSpace
} from 'utils'

import { CharactersCardWrapper, SuccessModal } from './components'

const RemoveDuplicate = () => {
  const { string: string_param } = useParams()
  const [characters, setCharacters] = useState<CharacterObject[] | null>(null)
  const [string, setString] = useState<string>('')

  const [isRemoveWhiteSpaceModalOpen, setIsRemoveWhiteSpaceModalOpen] =
    useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!string_param) return

    setString(string_param)

    if (hasWhiteSpace(string_param)) {
      setIsRemoveWhiteSpaceModalOpen(true)
      return
    }

    const charactersArray = string_param.split('')
    const newCharacters = charactersArray.map((char, idx) => ({
      char,
      id: idx + 1
    }))
    setCharacters(newCharacters)
  }, [string_param])

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

  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [hoverChar, setHoverChar] = useState<CharacterObject | null>(null)

  const handleRemoveDuplicate = useCallback(
    ({ char, id }: CharacterObject) => {
      if (!characters || !characterCountObj) return

      const newCharacters = characters.filter((charObj) => {
        characterCountObj[charObj.char] = 1
        if (charObj.char === char) {
          return charObj.id === id
        } else {
          return true
        }
      })

      setCharacters(newCharacters)
      setHoverChar(null)
    },
    [characters, setCharacters, setHoverChar, characterCountObj]
  )

  useKeyPress(({ key }) => {
    if (!characters) return
    let newIndex = 0
    switch (key) {
      case 'ArrowLeft':
        newIndex =
          selectedIndex !== 0 && selectedIndex !== -1
            ? selectedIndex - 1
            : characters.length - 1
        break
      case 'ArrowRight':
        newIndex =
          selectedIndex !== characters.length - 1 ? selectedIndex + 1 : 0
        break

      case 'Enter':
        handleRemoveDuplicate(characters[selectedIndex])
        return
      default:
        return null
    }
    setHoverChar(characters[newIndex])
    setSelectedIndex(newIndex)
  })

  if (isRemoveWhiteSpaceModalOpen) {
    return (
      <RemoveWhiteSpaceModal
        isOpen={isRemoveWhiteSpaceModalOpen}
        stringInput={string}
        setStringInput={setString}
        showCloseBtn={false}
        onNext={(_path) => {
          navigate('/' + _path)
          setIsRemoveWhiteSpaceModalOpen(false)
        }}
      />
    )
  }

  return (
    <div className={'h-full flex flex-col items-center gap-3 py-8 sm:py-10'}>
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
          handleRemoveDuplicate={handleRemoveDuplicate}
          hoverChar={hoverChar}
          setHoverChar={setHoverChar}
          characterCountObj={characterCountObj}
          characterColorObj={characterColorObj}
          characters={characters}
        />
      )}
    </div>
  )
}

RemoveDuplicate.layout = {
  hideFooter: true
}

export default RemoveDuplicate
