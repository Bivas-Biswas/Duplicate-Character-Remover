import { RemoveWhiteSpaceModal } from 'components'
import { useKeyPress } from 'hooks'
import React, { useCallback, useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CharacterObject } from 'types'
import {
  checkRemovedAllDuplicateOrNot,
  getCharacterWiseRandomColors,
  getCountCharMap,
  hasWhiteSpace
} from 'utils'

import CharacterCard from './components/CharacterCard'
import { CharacterCardWrapper, SuccessModal } from './components'
import { DEFAULT_VALUE, useRemoveDuplicateReducer } from './utils'

const RemoveDuplicate = () => {
  const { string: string_param } = useParams()
  const [state, dispatch] = useRemoveDuplicateReducer()

  const {
    characters,
    selectedChar,
    selectedCharId,
    haveWhiteSpace,
    string,
    charactersColor,
    charactersCount,
    haveDuplicate
  } = state
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (!string_param) return

    dispatch({ type: 'update_string', payload: string_param })

    if (hasWhiteSpace(string_param)) {
      dispatch({ type: 'update_have_white_space', payload: true })
    } else {
      dispatch({
        type: 'update_have_duplicate',
        payload: checkRemovedAllDuplicateOrNot(string_param)
      })
      dispatch({
        type: 'assign_color_to_character',
        payload: getCharacterWiseRandomColors(string_param)
      })
      dispatch({ type: 'create_charactersObject', payload: string_param })
      dispatch({
        type: 'update_characters_count',
        payload: getCountCharMap(string_param)
      })
    }
  }, [dispatch, string_param])

  const handleRemoveDuplicate = useCallback(
    ({ char, id }: CharacterObject) => {
      if (charactersCount[char] === 1 || !char) return

      const newCharacters = characters.filter((charObj) => {
        if (charObj.char === char) {
          return charObj.id === id
        } else {
          return true
        }
      })

      const newSelectIndex = newCharacters.findIndex(
        (charObj) => charObj.id === id
      )

      const haveAnyDuplicate = checkRemovedAllDuplicateOrNot(
        newCharacters.map((charObj) => charObj.char).join('')
      )

      dispatch({
        type: 'update_characters_count',
        payload: {
          ...charactersCount,
          [char]: 1
        }
      })
      dispatch({
        type: 'update_have_duplicate',
        payload: haveAnyDuplicate
      })
      dispatch({ type: 'update_charactersObject', payload: newCharacters })

      dispatch({
        type: 'update_select',
        payload: {
          selectedIndex: newSelectIndex,
          selectedChar: haveAnyDuplicate
            ? newCharacters[newSelectIndex].char
            : DEFAULT_VALUE.selectedChar,
          selectedCharId: newCharacters[newSelectIndex].id
        }
      })
    },
    [characters, charactersCount, dispatch]
  )

  useKeyPress((event) => {
    event.preventDefault()

    if (haveDuplicate) return

    switch (event.key) {
      case 'ArrowLeft':
        dispatch({ type: 'ArrowLeft' })
        break
      case 'ArrowRight':
        dispatch({ type: 'ArrowRight' })
        break
      case 'Enter':
        handleRemoveDuplicate({ char: selectedChar, id: selectedCharId })
        return
      default:
        return null
    }
  })

  if (haveWhiteSpace) {
    return (
      <RemoveWhiteSpaceModal
        isOpen={haveWhiteSpace}
        string={string}
        showCloseBtn={false}
        onRemoveSpace={(_stringWithNoSpace) => {
          dispatch({ type: 'update_string', payload: _stringWithNoSpace })
        }}
        onNext={(newString) => {
          dispatch({ type: 'update_have_white_space', payload: false })
          dispatch({ type: 'update_string', payload: newString })
          navigate('/' + newString)
        }}
      />
    )
  }

  return (
    <div className={'h-full flex flex-col items-center gap-3 py-8 sm:py-10'}>
      {haveDuplicate && (
        <SuccessModal
          isOpen={haveDuplicate}
          originalString={string}
          resultantString={characters.map((charObj) => charObj.char).join('')}
        />
      )}
      <CharacterCardWrapper>
        {characters.map(({ char, id }, idx) => (
          <CharacterCard
            key={id}
            char={char}
            colors={charactersColor[char]}
            haveDuplicate={charactersCount[char] > 1}
            id={id}
            onClick={() => {
              handleRemoveDuplicate({ char, id })
            }}
            onHover={(isHover) => {
              dispatch({
                type: 'update_select',
                payload: {
                  selectedIndex: isHover ? idx : DEFAULT_VALUE.selectedIndex,
                  selectedChar: isHover ? char : DEFAULT_VALUE.selectedChar,
                  selectedCharId: isHover ? id : DEFAULT_VALUE.selectedCharId
                }
              })
            }}
            selectedChar={selectedChar}
            selectedCharId={selectedCharId}
          />
        ))}
      </CharacterCardWrapper>
    </div>
  )
}

RemoveDuplicate.layout = {
  hideFooter: true
}

export default RemoveDuplicate
