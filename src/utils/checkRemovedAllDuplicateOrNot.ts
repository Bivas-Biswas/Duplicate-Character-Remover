const checkRemovedAllDuplicateOrNot = (characters: string[]) => {
  const alreadyVisitChar: Record<string, boolean> = {}
  for (const char of characters) {
    if (alreadyVisitChar[char]) {
      return false
    } else {
      alreadyVisitChar[char] = true
    }
  }
  return true
}

export { checkRemovedAllDuplicateOrNot }
