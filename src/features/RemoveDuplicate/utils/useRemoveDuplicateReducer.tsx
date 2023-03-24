import { useReducer } from 'react'
import {
  checkRemovedAllDuplicateOrNot,
  getCharacterWiseRandomColors,
  getCountCharMap,
  hasWhiteSpace
} from 'utils'

import { CharacterColors, CharacterObject } from '../removeduplicate.types'

export const DEFAULT_VALUE = {
  selectedIndex: -1,
  selectedChar: '',
  selectedCharId: -1
} as const

type initialStateType = {
  string: string
  characters: CharacterObject[]
  selectedIndex: number
  selectedChar: string
  selectedCharId: number
  charactersColor: Record<string, CharacterColors>
  haveWhiteSpace: boolean
  charactersCount: Record<string, number>
  haveDuplicate: boolean
}

const initialState: initialStateType = {
  characters: [],
  selectedIndex: DEFAULT_VALUE.selectedIndex,
  selectedChar: DEFAULT_VALUE.selectedChar,
  selectedCharId: DEFAULT_VALUE.selectedCharId,
  charactersColor: {},
  charactersCount: {},
  string: '',
  haveWhiteSpace: false,
  haveDuplicate: true
}

type ACTIONTYPE =
  | {
      type: 'ArrowLeft'
    }
  | {
      type: 'ArrowRight'
    }
  | {
      type: 'on_hover'
      payload: {
        isHover: boolean
        index: number
      } & CharacterObject
    }
  | {
      type: 'initialize_variables'
      payload: string
    }
  | {
      type: 'remove_duplicate'
      payload: CharacterObject
    }
  | {
      type: 'on_next'
      payload: string
    }
  | {
      type: 'update_string'
      payload: string
    }
const removeDuplicateReducer = (
  state: initialStateType,
  action: ACTIONTYPE
) => {
  let newSelectedIndex
  let newSelectedChar
  let newSelectedCharId
  let newCharacters
  let string_param = ''
  let newSelectIndex = -1
  let id = -1
  let char = ''
  let haveAnyDuplicate = true
  let isHover = false
  let index = -1

  switch (action.type) {
    case 'on_next':
      return {
        ...state,
        haveWhiteSpace: false,
        string: action.payload
      }

    case 'remove_duplicate':
      char = action.payload.char
      id = action.payload.id

      if (state.charactersCount[char] === 1 || !char) return { ...state }

      newCharacters = state.characters.filter((charObj) => {
        if (charObj.char === char) {
          return charObj.id === id
        } else {
          return true
        }
      })

      newSelectIndex = newCharacters.findIndex((charObj) => charObj.id === id)

      haveAnyDuplicate = checkRemovedAllDuplicateOrNot(
        newCharacters.map((charObj) => charObj.char).join('')
      )

      return {
        ...state,
        charactersCount: {
          ...state.charactersCount,
          [char]: 1
        },
        haveDuplicate: haveAnyDuplicate,
        characters: newCharacters,
        selectedIndex: newSelectIndex,
        selectedChar: !haveAnyDuplicate
          ? newCharacters[newSelectIndex].char
          : DEFAULT_VALUE.selectedChar,
        selectedCharId: newCharacters[newSelectIndex].id
      }
    case 'initialize_variables':
      string_param = action.payload

      return {
        ...state,
        haveWhiteSpace: hasWhiteSpace(string_param),
        haveDuplicate: checkRemovedAllDuplicateOrNot(string_param),
        charactersColor: getCharacterWiseRandomColors(string_param),
        characters: string_param.split('').map((char, idx) => ({
          char,
          id: idx + 1
        })),
        charactersCount: getCountCharMap(string_param),
        string: string_param
      }
    case 'update_string':
      return {
        ...state,
        string: action.payload
      }
    case 'on_hover':
      isHover = action.payload.isHover
      char = action.payload.char
      id = action.payload.id
      index = action.payload.index
      return {
        ...state,
        selectedIndex: isHover ? index : DEFAULT_VALUE.selectedIndex,
        selectedChar: isHover ? char : DEFAULT_VALUE.selectedChar,
        selectedCharId: isHover ? id : DEFAULT_VALUE.selectedCharId
      }

    case 'ArrowLeft':
      newSelectedIndex =
        state.selectedIndex !== 0 && state.selectedIndex !== -1
          ? state.selectedIndex - 1
          : state.characters.length - 1

      newSelectedChar = state.characters[newSelectedIndex].char
      newSelectedCharId = state.characters[newSelectedIndex].id

      if (state.charactersCount[newSelectedChar] > 1)
        return {
          ...state,
          selectedIndex: newSelectedIndex,
          selectedChar: newSelectedChar,
          selectedCharId: newSelectedCharId
        }
      else
        return {
          ...state,
          selectedIndex: newSelectedIndex,
          selectedChar: DEFAULT_VALUE.selectedChar,
          selectedCharId: newSelectedCharId
        }

    case 'ArrowRight':
      newSelectedIndex =
        state.selectedIndex !== state.characters.length - 1
          ? state.selectedIndex + 1
          : 0

      newSelectedChar = state.characters[newSelectedIndex].char
      newSelectedCharId = state.characters[newSelectedIndex].id
      if (state.charactersCount[newSelectedChar] > 1)
        return {
          ...state,
          selectedIndex: newSelectedIndex,
          selectedChar: newSelectedChar,
          selectedCharId: newSelectedCharId
        }
      else
        return {
          ...state,
          selectedIndex: newSelectedIndex,
          selectedChar: DEFAULT_VALUE.selectedChar,
          selectedCharId: newSelectedCharId
        }
    default:
      throw new Error(`[useRemoveDuplicateReducer]: wrong action type entered`)
  }
}

const useRemoveDuplicateReducer = () => {
  const [state, dispatch] = useReducer(removeDuplicateReducer, initialState)

  return [state, dispatch] as const
}

export default useRemoveDuplicateReducer
