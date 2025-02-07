export const from = (str: string) => {
  str = str.replace(/\s+/g, " ").trim()

  const [pre, post] = str.split("|")

  const preParts = pre.trim().split(" ")
  const any = preParts.pop()
  const mandatoryModifiers = preParts
  const optionalModifiers = post ? post.trim().split(" ") : []

  const modifiers = {
    ...(mandatoryModifiers.length > 0 && { mandatory: mandatoryModifiers }),
    ...(optionalModifiers.length > 0 && { optional: optionalModifiers }),
  }

  return {
    any,
    ...(Object.keys(modifiers).length > 0 && { modifiers }),
  }
}
