const startsWithCapital = (str: string) => /^[A-Z]/.test(str)
const regexifyBundleId = (str: string) => `^${str.replace(/\./g, "\\.")}$`

export { startsWithCapital, regexifyBundleId }
