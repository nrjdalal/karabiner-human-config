import fs from "fs/promises"
import { join } from "path"
import {
  regexifyBundleId,
  renameKeys,
  startsWithCapital,
  transformObjectKey,
} from "@/utils"
import { manipulatorKeys } from "~/constants"
import { bundleId as bid } from "bundle-id"
import { from } from "./from"
import { to } from "./to"

const test = {
  fn: { t: "fn", a: "left_command tab" },
  "fn spacebar | test": "left_command spacebar",
  "fn v": "$ open '/Applications/Visual Studio Code.app'",
  "hyper | spacebar": "left_command spacebar",
  caps_lock: { t: "hyper", a: "100 caps_lock" },
  "Visual Studio Code": {
    fn: { t: "fn", a: "left_command tab" },
  },
}

export const transformConfig = async ({
  app,
  bundleId,
  config,
}: {
  app?: string
  bundleId?: string
  config: { [key: string]: any }
}): Promise<any[]> => {
  const result = []

  for (let [key, value] of Object.entries(config)) {
    if (typeof value === "string") value = { to: value }

    if (startsWithCapital(key)) {
      const appConfig = await transformConfig({
        app: key.toLowerCase(),
        bundleId: regexifyBundleId(await bid(key)),
        config: value,
      })
      result.push(...appConfig)
      continue
    }

    value = renameKeys(value, manipulatorKeys)

    const object = {
      type: "basic",
      description: bundleId ? `${app} ${key}` : key,
      from: key,
      ...value,
      ...(bundleId && {
        conditions: [
          {
            type: "frontmost_application_if",
            bundle_identifiers: [bundleId],
          },
        ],
      }),
    }

    transformObjectKey(object, "from", from)
    transformObjectKey(object, "to", to)

    result.push(object)
  }

  return result
}

await fs.writeFile(
  join(process.cwd(), ".logfile"),
  JSON.stringify(
    await transformConfig({
      config: test,
    }),
    null,
    2,
  ),
  "utf-8",
)
