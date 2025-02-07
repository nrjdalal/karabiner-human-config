import { splitAtFirstMatch } from "@/utils"

export const from = (str: string) => {
  str = str.replace(/\s+/g, " ")

  const [pre, post] = splitAtFirstMatch(str, "|")

  const preParts = pre.split(" ")
  const any = preParts.pop()
  const mandatoryModifiers = preParts
  const optionalModifiers = post ? post.split(" ") : []

  const modifiers = {
    ...(mandatoryModifiers.length && { mandatory: mandatoryModifiers }),
    ...(optionalModifiers.length && { optional: optionalModifiers }),
  }

  return {
    any,
    ...(Object.keys(modifiers).length && { modifiers }),
  }
}
