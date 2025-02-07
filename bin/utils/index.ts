const regexifyBundleId = (str: string) => `^${str.replace(/\./g, "\\.")}$`

const renameKeys = (
  value: { [key: string]: any },
  mappings: { [key: string]: string },
) => {
  for (const [key, newKey] of Object.entries(mappings)) {
    if (value[key]) {
      value[newKey] = value[key]
      delete value[key]
    }
  }
  return value
}

const splitAtFirstMatch = (str: string, search: string) => {
  const parts = str.split(search)
  return parts.length
    ? [parts[0].trim(), str.slice(parts[0].length + search.length).trim()]
    : [str.trim()]
}

const startsWithCapital = (str: string) => /^[A-Z]/.test(str)

const transformObjectKey = <T, U>(
  obj: { [key: string]: T },
  key: string,
  func: (value: T) => U,
): void => {
  const value = obj[key]
  if (value !== undefined) {
    obj[key] = func(value) as any
  }
}

export {
  regexifyBundleId,
  renameKeys,
  splitAtFirstMatch,
  startsWithCapital,
  transformObjectKey,
}
