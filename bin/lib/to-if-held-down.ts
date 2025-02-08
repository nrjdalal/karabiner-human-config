import { extractFlags, extractTimeout, splitAtFirstMatch } from "@/utils"
import { customAliases } from "~/constants"

export const toIfHeldDown = (
  input:
    | string
    | {
        [key: string]: any
      },
) => {
  if (typeof input === "object") return input

  let [pre, post] = splitAtFirstMatch(input, "$")

  for (const [key, value] of Object.entries(customAliases)) {
    pre = pre.replace(new RegExp(`\\b${key}\\b`, "g"), value)
  }

  const [rest, flags] = extractFlags(pre)
  const [modifiers, ms] = extractTimeout(rest.join(" "))

  if (post) {
    return [
      {
        shell_command: post,
        ...flags,
        ...ms,
      },
    ]
  }

  return [
    {
      key_code: modifiers.pop(),
      ...(modifiers.length && { modifiers }),
      ...flags,
      ...ms,
    },
  ]
}
