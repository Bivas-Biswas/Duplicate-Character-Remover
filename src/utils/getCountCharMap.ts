export const getCountCharMap = (charArray: string[]) => {
  const countMap: Record<string, number> = {}

  for (const char of charArray) {
    if (countMap[char]) {
      countMap[char] = countMap[char] + 1
    } else {
      countMap[char] = 1
    }
  }

  return countMap
}
