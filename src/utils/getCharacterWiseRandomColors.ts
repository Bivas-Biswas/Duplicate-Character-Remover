import { colors, LightDarkColorMap } from 'data'
import { CharacterColors } from 'types'

import { objectKeys } from './index'

export const getCharacterWiseRandomColors = (characters: string[]) => {
  const colorNames = objectKeys(colors)
  const lightColorCodes = objectKeys(LightDarkColorMap)

  const lightColorhaveIt: string[] = []

  const totalColorName = colorNames.length
  const totalLightColorCode = lightColorCodes.length

  const generateUniqueRandom = (): CharacterColors => {
    // Generate random number
    const randomColorNameIndex = Math.floor(Math.random() * totalColorName)
    const randomColorCodeIndex = Math.floor(Math.random() * totalLightColorCode)

    const colorName = colorNames[randomColorNameIndex]
    const lightColorCode = lightColorCodes[randomColorCodeIndex]
    const darkColorCode = LightDarkColorMap[lightColorCode]

    const lightColor = colors[colorName][lightColorCode]
    const darkColor = colors[colorName][darkColorCode]

    if (!lightColorhaveIt.includes(lightColor)) {
      lightColorhaveIt.push(lightColor)
      return {
        dark: darkColor,
        light: lightColor
      }
    } else {
      if (lightColorhaveIt.length < totalColorName + totalLightColorCode) {
        // Recursively generate number
        return generateUniqueRandom()
      } else {
        console.error('No more colors available.')
        return {
          light: '',
          dark: ''
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
