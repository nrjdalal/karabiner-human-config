export const manipulatorMappings = (value: { [key: string]: any }) => {
  const mappings = {
    alone: "to_if_alone",
    held: "to_if_held_down",
    after: "to_after_key_up",
    delayed: "to_delayed_action",
  }

  for (const [key, newKey] of Object.entries(mappings)) {
    if (value[key]) {
      value[newKey] = value[key]
      delete value[key]
    }
  }
  return value
}
