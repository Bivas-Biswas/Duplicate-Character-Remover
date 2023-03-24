import { RemoveWhiteSpaceModal } from 'components'
import { useKeyPress } from 'hooks'
import React, { useCallback, useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CharacterObject } from 'types'

import CharacterCard from './components/CharacterCard'
import { CharacterCardWrapper, SuccessModal } from './components'
import { useRemoveDuplicateReducer } from './utils'

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
    dispatch({ type: 'initialize_variables', payload: string_param })
  }, [dispatch, string_param])

  const handleRemoveDuplicate = useCallback(
    (charObj: CharacterObject) => {
      dispatch({ type: 'remove_duplicate', payload: charObj })
    },
    [dispatch]
  )

  useKeyPress((event) => {
    event.preventDefault()

    if (!haveDuplicate) return

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
        onRemoveSpace={(stringWithNoSpace) => {
          dispatch({ type: 'update_string', payload: stringWithNoSpace })
        }}
        onNext={(newString) => {
          dispatch({ type: 'on_next', payload: newString })
          navigate('/' + newString)
        }}
      />
    )
  }

  return (
    <div className={'h-full flex flex-col items-center gap-3 py-8 sm:py-10'}>
      <SuccessModal
        isOpen={!haveDuplicate}
        originalString={string}
        resultantString={characters.map((charObj) => charObj.char).join('')}
      />

      <CharacterCardWrapper>
        {characters.map(({ char, id }, index) => (
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
                type: 'on_hover',
                payload: {
                  isHover,
                  char,
                  index,
                  id
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
