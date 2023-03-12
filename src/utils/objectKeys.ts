const objectKeys = <Obj extends {}>(obj: Obj) => {
  return Object.keys(obj) as (keyof Obj)[]
}

export default objectKeys
