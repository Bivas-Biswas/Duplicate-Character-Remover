const checkRemovedAllDuplicateOrNot = (string: string) => {
  const alreadyVisitChar: Record<string, boolean> = {}
  for (const char of string.split('')) {
    if (alreadyVisitChar[char]) {
      return false
    } else {
      alreadyVisitChar[char] = true
    }
  }
  return true
}

export { checkRemovedAllDuplicateOrNot }
