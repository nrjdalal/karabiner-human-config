export const group = (
  string: string,
):
  | {
      [key: string]:
        | string
        | boolean
        | number
        | string[]
        | null
        | { mandatory?: string[]; optional?: string[] }
        | { mandatory: string[]; optional?: string[] }
        | { mandatory: string[] }
        | { optional: string[] }
    }
  | string => {
  const result: {
    [key: string]:
      | string
      | boolean
      | number
      | string[]
      | null
      | { mandatory: string[]; optional?: string[] }
      | { mandatory?: string[]; optional?: string[] }
      | { mandatory: string[]; optional?: string[] }
      | { mandatory: string[] }
      | { optional: string[] }
  } = {}

  const delimiters = ["~", "|", "$"].reverse()

  for (const delimiter of delimiters) {
    const index = string.indexOf(delimiter)
    if (index !== -1) {
      result[delimiter] = string.slice(index + 1).trim()
      string = string.slice(0, index).trim()
    } else {
      result[delimiter] = null
    }
  }

  for (const key in result) {
    if (result[key] === null) {
      delete result[key]
    }
  }

  if (Object.keys(result).length === 1 && result["$"]) {
    if (
      string.indexOf("$") === -1 &&
      string.replace(/\s+/g, " ").trim().length
    ) {
      result["~"] = string.replace(/\s+/g, " ").trim()
    }
  }

  const trimmedString = string.replace(/\s+/g, " ").trim()

  if (result["|"] && !result["$"]) {
    result["~"] = trimmedString
  } else if (result["$"] && result["|"]) {
    result["~"] = trimmedString
  } else if (!Object.keys(result).length) {
    result["~"] = trimmedString
  }

  if (result["~"]) {
    let array = typeof result["~"] === "string" ? result["~"].split(" ") : []
    const flags = ["lazy", "repeat", "halt"]
    const hold = array.find((value) => !isNaN(parseInt(value)))

    for (const flag of flags) {
      if (array.includes(flag)) {
        result[flag] = true
        array = array.filter((value) => value !== flag)
      }
    }

    if (hold) {
      result["hold_down_milliseconds"] = parseInt(hold)
      array = array.filter((value) => value !== hold)
    }

    result["key_code"] = array.pop() || null
    result["modifiers_mandatory"] = array.length ? array : null

    result["~"] = null
  }

  if (result["$"]) {
    result["shell_command"] = result["$"]
    result["$"] = null
  }

  if (result["|"]) {
    result["modifiers_optional"] =
      typeof result["|"] === "string"
        ? result["|"].replace(/\s+/g, " ").trim().split(" ")
        : []
    result["|"] = null
  }

  for (const key in result) {
    if (result[key] === null) {
      delete result[key]
    }
  }

  if (result["modifiers_mandatory"] && result["modifiers_optional"]) {
    result["from_modifiers"] = {
      mandatory: Array.isArray(result["modifiers_mandatory"])
        ? result["modifiers_mandatory"]
        : [],
      optional: Array.isArray(result["modifiers_optional"])
        ? result["modifiers_optional"]
        : [],
    }
    result["modifiers"] = result["modifiers_mandatory"]
    result["modifiers_optional"] = null
    result["modifiers_mandatory"] = null
  }

  if (result["modifiers_mandatory"]) {
    result["from_modifiers"] = {
      mandatory: Array.isArray(result["modifiers_mandatory"])
        ? result["modifiers_mandatory"]
        : [],
    }
    result["modifiers"] = result["modifiers_mandatory"]
    result["modifiers_mandatory"] = null
  }

  if (result["modifiers_optional"]) {
    result["from_modifiers"] = {
      optional: Array.isArray(result["modifiers_optional"])
        ? result["modifiers_optional"]
        : [],
    }
    result["modifiers_optional"] = null
  }

  for (const key in result) {
    if (result[key] === null) {
      delete result[key]
    }
  }

  return result
}
