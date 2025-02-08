import { splitAtFirstMatch } from "@/utils"
import { customAliases } from "~/constants"

export const from = (str: string) => {
  let [pre, post] = splitAtFirstMatch(str, "|")

  for (const [key, value] of Object.entries(customAliases)) {
    pre = pre.replace(new RegExp(`\\b${key}\\b`, "g"), value)
    post = post?.replace(new RegExp(`\\b${key}\\b`, "g"), value)
  }

  const preParts = pre.split(" ")
  const key_code = preParts.pop()
  const mandatoryModifiers = preParts
  const optionalModifiers = post ? post.split(" ") : []

  const modifiers = {
    ...(mandatoryModifiers.length && { mandatory: mandatoryModifiers }),
    ...(optionalModifiers.length && { optional: optionalModifiers }),
  }

  return {
    key_code,
    ...(Object.keys(modifiers).length && { modifiers }),
  }
}
