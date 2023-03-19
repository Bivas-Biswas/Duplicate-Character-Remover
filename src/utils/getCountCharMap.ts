export const getCountCharMap = (string: string) => {
  const countMap: Record<string, number> = {}

  for (const char of string.split('')) {
    if (countMap[char]) {
      countMap[char] = countMap[char] + 1
    } else {
      countMap[char] = 1
    }
  }

  return countMap
}
