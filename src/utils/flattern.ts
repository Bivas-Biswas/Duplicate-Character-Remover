const flatten = (input: any, reference: string, output: any) => {
  output = output || {}
  for (let key in input) {
    const value = input[key]
    key = reference ? reference + '-' + key : key
    if (typeof value === 'object' && value !== null) {
      flatten(value, key, output)
    } else {
      output[key] = value
    }
  }
  return output
}

export default flatten
