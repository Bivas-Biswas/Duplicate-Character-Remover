const checkRemovedAllDuplicateOrNot = (string: string) => {
  const alreadyVisitChar: string[] = []
  for (const char of string.split('')) {
    if (alreadyVisitChar.includes(char)) {
      return true
    } else {
      alreadyVisitChar.push(char)
    }
  }
  return false
}

export { checkRemovedAllDuplicateOrNot }
