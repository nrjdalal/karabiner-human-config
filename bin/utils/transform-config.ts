import { startsWithCapital } from "@/utils"
import { bundleId } from "bundle-id"

const test = {
  fn: { to: "fn", to_if_alone: "left_command tab" },
  "fn spacebar": "left_command spacebar",
  "fn v": "$ open '/Applications/Visual Studio Code.app'",
  "hyper spacebar": "left_command spacebar",
  caps_lock: { to: "hyper", to_if_alone: "100 caps_lock" },
  "Visual Studio Code": {
    fn: { to: "fn", to_if_alone: "left_command tab" },
  },
}

export const transformConfig = async ({
  app,
  config,
}: {
  app?: string
  config: { [key: string]: any }
}): Promise<any[]> => {
  const result = []

  for (let [key, value] of Object.entries(config)) {
    if (typeof value === "string") value = { to: value }
    if (startsWithCapital(key)) {
      const app = await bundleId(key)
      const appConfig = await transformConfig({
        app,
        config: value,
      })
      result.push(...appConfig)
      continue
    }
    if (app) {
      result.push({
        type: "basic",
        description: `${app} ${key}`,
        from: key,
        ...value,
        conditions: [
          {
            type: "frontmost_application_if",
            bundle_identifiers: [app],
          },
        ],
      })
      continue
    }
    result.push({
      type: "basic",
      description: key,
      from: key,
      ...value,
    })
  }

  return result
}

console.log(
  await transformConfig({
    config: test,
  }),
)
