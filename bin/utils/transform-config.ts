import { startsWithCapital } from "@/utils"
import { manipulatorMappings } from "@/utils/mappings"
import { bundleId } from "bundle-id"

const test = {
  fn: { to: "fn", alone: "left_command tab" },
  "fn spacebar": "left_command spacebar",
  "fn v": "$ open '/Applications/Visual Studio Code.app'",
  "hyper spacebar": "left_command spacebar",
  caps_lock: { to: "hyper", alone: "100 caps_lock" },
  "Visual Studio Code": {
    fn: { to: "fn", alone: "left_command tab" },
  },
}

export const transformConfig = async ({
  appName,
  appIdentifier,
  config,
}: {
  appName?: string
  appIdentifier?: string
  config: { [key: string]: any }
}): Promise<any[]> => {
  const result = []

  for (let [key, value] of Object.entries(config)) {
    if (typeof value === "string") value = { to: value }
    if (startsWithCapital(key)) {
      const appIdentifier = await bundleId(key)
      const appConfig = await transformConfig({
        appName: key.toLowerCase(),
        appIdentifier: appIdentifier,
        config: value,
      })
      result.push(...appConfig)
      continue
    }

    value = manipulatorMappings(value)

    result.push({
      type: "basic",
      description: appIdentifier ? `${appName} ${key}` : key,
      from: key,
      ...value,
      ...(appIdentifier && {
        conditions: [
          {
            type: "frontmost_application_if",
            bundle_identifiers: [appIdentifier],
          },
        ],
      }),
    })
  }

  return result
}

console.log(
  await transformConfig({
    config: test,
  }),
)
