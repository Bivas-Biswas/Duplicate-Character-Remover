import { BackgroundFontColorMap, colors } from 'data'
import { CharacterColors } from 'types'

import { objectKeys } from './index'

export const getCharacterWiseRandomColors = (characters: string[]) => {
  const allColorName = objectKeys(colors)
  const backgroudColorCode = objectKeys(BackgroundFontColorMap)

  const backGroundColorhaveIt: string[] = []

  const totalColorName = allColorName.length
  const totalColorCode = backgroudColorCode.length

  const generateUniqueRandom = (): CharacterColors => {
    // Generate random number
    const randomColorNameIndex = Math.floor(Math.random() * totalColorName)
    const randomColorCodesIndex = Math.floor(Math.random() * totalColorCode)

    const colorName = allColorName[randomColorNameIndex]
    const colorCodeForBackGround = backgroudColorCode[randomColorCodesIndex]
    const colorCodeForFont = BackgroundFontColorMap[colorCodeForBackGround]

    const backGroundColor = colors[colorName][colorCodeForBackGround]
    const fontColor = colors[colorName][colorCodeForFont]

    if (!backGroundColorhaveIt.includes(backGroundColor)) {
      backGroundColorhaveIt.push(backGroundColor)
      return {
        backGroundColor,
        fontColor
      }
    } else {
      if (backGroundColorhaveIt.length < totalColorName + totalColorCode) {
        // Recursively generate number
        return generateUniqueRandom()
      } else {
        console.error('No more colors available.')
        return {
          backGroundColor: '',
          fontColor: ''
        }
      }
    }
  }

  const saveCharWiseColor: Record<string, CharacterColors> = {}

  for (const char of characters) {
    if (!saveCharWiseColor[char]) {
      saveCharWiseColor[char] = generateUniqueRandom()
    }
  }

  return saveCharWiseColor
}
