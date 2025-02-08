import { extractFlags, splitAtFirstMatch } from "@/utils"

export const toIfHeldDown = (
  input:
    | string
    | {
        [key: string]: any
      },
) => {
  if (typeof input === "object") return input

  input = input.trim()

  const [pre, post] = splitAtFirstMatch(input, "$")
  const [cmd, flags] = extractFlags(pre)

  if (post) {
    return [
      {
        shell_command: post,
        ...flags,
      },
    ]
  }

  const any = cmd.pop()

  const modifiers = cmd

  return [
    {
      any,
      ...(modifiers.length && { modifiers }),
      ...flags,
    },
  ]
}
