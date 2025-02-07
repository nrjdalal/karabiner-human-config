export const from = (str: string) => {
  str = str.replace(/\s+/g, " ").trim()

  const pre = str.split("|")[0]
  const post = str.split("|")[1]

  const mandatoryModifiers = pre.split(" ").slice(0, -1)
  const optionalModifiers = post ? post.split(" ") : []

  const result: any = {
    any: pre.split(" ").pop(),
  }

  if (mandatoryModifiers.length > 0 || optionalModifiers.length > 0) {
    result.modifiers = {}
    if (mandatoryModifiers.length > 0) {
      result.modifiers.mandatory = mandatoryModifiers
    }
    if (optionalModifiers.length > 0) {
      result.modifiers.optional = optionalModifiers
    }
  }

  return result
}
