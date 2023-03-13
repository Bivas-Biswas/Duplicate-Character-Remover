export const getNoOfDuplicateChar = (charObj: Record<string, number>) => {
  let total = 0
  const keys = Object.keys(charObj)
  for (const char of keys) {
    const value = charObj[char]
    if (value !== 1) {
      total += value - 1
    }
  }
  return total
}
