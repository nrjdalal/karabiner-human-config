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

const startsWithCapital = (str: string) => /^[A-Z]/.test(str)

export { regexifyBundleId, renameKeys, startsWithCapital }
