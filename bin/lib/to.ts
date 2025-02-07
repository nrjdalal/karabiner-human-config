import { splitAtFirstMatch } from "@/utils"

export const to = (str: string) => {
  str = str.trim()

  const parts = splitAtFirstMatch(str, "$")

  if (parts[1]) {
    return [{ shell_command: parts[1] }]
  }

  return [{ any: parts[0] }]
}
