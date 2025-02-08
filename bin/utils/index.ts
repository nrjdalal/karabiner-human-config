const extractFlags = (str: string) => {
  const flags = ["lazy", "repeat", "halt"]
  str = str.replace(/\s+/g, " ")
  const parts = str.split(" ")
  const flagsObj = parts.reduce(
    (acc, part) => {
      if (flags.includes(part)) {
        acc[part] = true
        return acc
      }
      return acc
    },
    {} as { [key: string]: boolean },
  )
  const cleanStr = parts.filter((part) => !flags.includes(part))
  return [cleanStr, flagsObj] as [string[], { [key: string]: boolean } | {}]
}

const extractTimeout = (str: string) => {
  str = str.replace(/\s+/g, " ")
  const parts = str.split(" ")
  const timeoutParts = parts.filter((part) => parseInt(part) > 9)
  const timeout =
    timeoutParts.length === 1
      ? {
          hold_down_milliseconds: parseInt(timeoutParts[0]),
        }
      : {}
  const cleanStr = parts.filter(
    (part) => isNaN(parseInt(part)) || parseInt(part) < 10,
  )
  return [cleanStr, timeout] as [string[], { [key: string]: number } | {}]
}

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
  extractFlags,
  extractTimeout,
  regexifyBundleId,
  renameKeys,
  splitAtFirstMatch,
  startsWithCapital,
  transformObjectKey,
}
