import { extractFlags, extractTimeout, splitAtFirstMatch } from "@/utils"

export const toIfAlone = (
  input:
    | string
    | {
        [key: string]: any
      },
) => {
  if (typeof input === "object") return input

  const [pre, post] = splitAtFirstMatch(input, "$")
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
      any: modifiers.pop(),
      ...(modifiers.length && { modifiers }),
      ...flags,
      ...ms,
    },
  ]
}
