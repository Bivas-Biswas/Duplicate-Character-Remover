import { useReducer } from 'react'
import { checkRemovedAllDuplicateOrNot } from 'utils'

import { CharacterColors, CharacterObject } from '../removeduplicate.types'

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
  selectedIndex: -1,
  selectedChar: '',
  selectedCharId: -1,
  charactersColor: {},
  charactersCount: {},
  string: '',
  haveWhiteSpace: false,
  haveDuplicate: false
}

type ACTIONTYPE =
  | {
      type: 'update_have_duplicate'
      payload: initialStateType['haveDuplicate']
    }
  | {
      type: 'update_characters_count'
      payload: initialStateType['charactersCount']
    }
  | {
      type: 'assign_color_to_character'
      payload: initialStateType['charactersColor']
    }
  | {
      type: 'update_have_white_space'
      payload: initialStateType['haveWhiteSpace']
    }
  | {
      type: 'update_charactersObject'
      payload: initialStateType['characters']
    }
  | {
      type: 'create_charactersObject'
      payload: string
    }
  | {
      type: 'ArrowLeft'
    }
  | {
      type: 'ArrowRight'
    }
  | {
      type: 'update_select'
      payload: {
        selectedIndex: number
        selectedChar: string
        selectedCharId: number
      }
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

  switch (action.type) {
    case 'update_characters_count':
      return {
        ...state,
        charactersCount: action.payload
      }
    case 'assign_color_to_character':
      return {
        ...state,
        charactersColor: action.payload
      }
    case 'update_have_duplicate':
      return {
        ...state,
        haveDuplicate: action.payload
      }
    case 'update_have_white_space':
      return { ...state, haveWhiteSpace: action.payload }
    case 'update_string':
      return {
        ...state,
        string: action.payload
      }
    case 'update_select':
      return {
        ...state,
        selectedCharId: action.payload.selectedCharId,
        selectedIndex: action.payload.selectedIndex,
        selectedChar: action.payload.selectedChar
      }
    case 'create_charactersObject':
      newCharacters = action.payload.split('').map((char, idx) => ({
        char,
        id: idx + 1
      }))
      return {
        ...state,
        characters: newCharacters
      }

    case 'update_charactersObject':
      return { ...state, characters: action.payload }

    case 'ArrowLeft':
      newSelectedIndex =
        state.selectedIndex !== 0 && state.selectedIndex !== -1
          ? state.selectedIndex - 1
          : state.characters.length - 1

      newSelectedChar = state.characters[newSelectedIndex].char
      newSelectedCharId = state.characters[newSelectedIndex].id
      return {
        ...state,
        selectedIndex: newSelectedIndex,
        selectedChar: newSelectedChar,
        selectedCharId: newSelectedCharId
      }

    case 'ArrowRight':
      newSelectedIndex =
        state.selectedIndex !== state.characters.length - 1
          ? state.selectedIndex + 1
          : 0

      newSelectedChar = state.characters[newSelectedIndex].char
      newSelectedCharId = state.characters[newSelectedIndex].id
      return {
        ...state,
        selectedIndex: newSelectedIndex,
        selectedChar: newSelectedChar,
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
